import { getDatabase } from "@netlify/database";
import type { Context, Config } from "@netlify/functions";
import { loadSettings, serviceState, etaFor, toMinutes } from "../lib/service.mts";

/* Everything here is behind the kitchen password. It exposes the day's
   takings, so it must never be readable from the URL alone. */

function authed(req: Request) {
  const expected = Netlify.env.get("ABIJA_PASSWORD");
  if (!expected) return false;
  const given = req.headers.get("x-abija-key") || "";
  return given === expected;
}

const HHMM = /^([01]\d|2[0-3]):([0-5]\d)$/;

/* Slugs end up printed on a QR code, so they have to be ASCII and stable.
   Macedonian and Albanian names are transliterated rather than dropped. */
const TRANSLIT: Record<string, string> = {
  а: "a", б: "b", в: "v", г: "g", д: "d", ѓ: "gj", е: "e", ж: "zh", з: "z", ѕ: "dz",
  и: "i", ј: "j", к: "k", л: "l", љ: "lj", м: "m", н: "n", њ: "nj", о: "o", п: "p",
  р: "r", с: "s", т: "t", ќ: "kj", у: "u", ф: "f", х: "h", ц: "c", ч: "ch", џ: "dj",
  ш: "sh", ë: "e", ç: "c",
};

function slugify(name: string) {
  const base = [...name.toLowerCase()]
    .map((ch) => TRANSLIT[ch] ?? ch)
    .join("")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
  return base || "firma-" + Math.floor(1000 + Math.random() * 9000);
}

export default async (req: Request, _context: Context) => {
  if (!authed(req)) return Response.json({ error: "unauthorized" }, { status: 401 });

  const db = getDatabase();
  const url = new URL(req.url);

  /* --- read today's board --- */
  if (req.method === "GET") {
    const settings = await loadSettings(db);

    /* LEFT JOIN: an order from the plain link has no company behind it, and it
       still has to reach the board. `location` comes back null for those, and
       the address the customer typed stands in for it. */
    const orders = await db.sql`
      SELECT o.id, o.code, o.person, o.note, o.total, o.status, o.created_at,
             o.accepted_at, o.done_at, o.fulfilment, o.address, o.contact_phone,
             l.name AS location, o.location_slug AS slug
      FROM orders o
      LEFT JOIN locations l ON l.slug = o.location_slug
      WHERE o.created_at >= date_trunc('day', NOW() AT TIME ZONE 'Europe/Skopje')
      ORDER BY o.created_at DESC`;

    const items = await db.sql`
      SELECT oi.order_id, oi.item_id, oi.name_sq, oi.name_mk, oi.qty, oi.unit_price
      FROM order_items oi
      JOIN orders o ON o.id = oi.order_id
      WHERE o.created_at >= date_trunc('day', NOW() AT TIME ZONE 'Europe/Skopje')`;

    const menu = await db.sql`
      SELECT id, name_sq, name_mk, desc_sq, desc_mk, category, price, photo,
             available, is_special, is_veg, sort_order
      FROM menu_items ORDER BY sort_order, id`;

    const locations = await db.sql`
      SELECT l.slug, l.name, l.street, l.phone, l.active,
             COUNT(o.id)::int AS orders_today
      FROM locations l
      LEFT JOIN orders o ON o.location_slug = l.slug
        AND o.created_at >= date_trunc('day', NOW() AT TIME ZONE 'Europe/Skopje')
      GROUP BY l.slug, l.name, l.street, l.phone, l.active
      ORDER BY l.name`;

    const byOrder = new Map<number, any[]>();
    for (const it of items as any[]) {
      if (!byOrder.has(it.order_id)) byOrder.set(it.order_id, []);
      byOrder.get(it.order_id)!.push(it);
    }

    return Response.json(
      {
        orders: (orders as any[]).map((o) => ({
          ...o,
          items: byOrder.get(o.id) ?? [],
          eta: etaFor(o.created_at, settings.prep_minutes),
        })),
        menu,
        locations,
        service: serviceState(settings),
        settings: {
          open_from: settings.open_from,
          open_to: settings.open_to,
          closed_weekdays: settings.closed_weekdays,
          paused: settings.paused,
          prep_minutes: settings.prep_minutes,
          notice_sq: settings.notice_sq,
          notice_mk: settings.notice_mk,
        },
      },
      { headers: { "Cache-Control": "no-store" } }
    );
  }

  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });

  const action = url.searchParams.get("action");
  const body = await req.json().catch(() => ({}));

  /* --- move an order along --- */
  if (action === "status") {
    const status = String(body.status || "");
    if (!["new", "prep", "done"].includes(status))
      return Response.json({ error: "bad_status" }, { status: 400 });
    /* Timestamps are stamped the first time an order reaches each stage; the
       customer's tracker reads them, and undo must not erase the history. */
    await db.sql`
      UPDATE orders SET
        status = ${status},
        accepted_at = CASE WHEN ${status} IN ('prep','done') AND accepted_at IS NULL
                           THEN NOW() ELSE accepted_at END,
        done_at = CASE WHEN ${status} = 'done' THEN COALESCE(done_at, NOW()) ELSE done_at END
      WHERE id = ${Number(body.id)}`;
    return Response.json({ ok: true });
  }

  /* --- close out a whole company in one click --- */
  if (action === "deliver-location") {
    const slug = String(body.slug || "");
    if (!slug) return Response.json({ error: "bad_request" }, { status: 400 });
    await db.sql`
      UPDATE orders SET status = 'done',
        accepted_at = COALESCE(accepted_at, NOW()),
        done_at = COALESCE(done_at, NOW())
      WHERE location_slug = ${slug}
        AND status <> 'done'
        AND created_at >= date_trunc('day', NOW() AT TIME ZONE 'Europe/Skopje')`;
    return Response.json({ ok: true });
  }

  /* --- sold out / back on / price change / today's special / photo file --- */
  if (action === "item") {
    const id = Number(body.id);
    if (!Number.isInteger(id)) return Response.json({ error: "bad_id" }, { status: 400 });
    if (typeof body.available === "boolean")
      await db.sql`UPDATE menu_items SET available = ${body.available} WHERE id = ${id}`;
    if (typeof body.is_special === "boolean")
      await db.sql`UPDATE menu_items SET is_special = ${body.is_special} WHERE id = ${id}`;
    if (typeof body.is_veg === "boolean")
      await db.sql`UPDATE menu_items SET is_veg = ${body.is_veg} WHERE id = ${id}`;
    if (Number.isInteger(body.price) && body.price >= 0 && body.price <= 100000)
      await db.sql`UPDATE menu_items SET price = ${body.price} WHERE id = ${id}`;
    if (typeof body.photo === "string") {
      const photo = body.photo.trim().toLowerCase().replace(/\.(jpe?g|png|webp|avif)$/, "");
      if (photo === "" || /^[a-z0-9-]{1,60}$/.test(photo))
        await db.sql`UPDATE menu_items SET photo = ${photo || null} WHERE id = ${id}`;
    }
    return Response.json({ ok: true });
  }

  /* --- hours, pause switch, kitchen notice --- */
  if (action === "settings") {
    const next: Array<[string, string]> = [];
    if (HHMM.test(String(body.open_from))) next.push(["open_from", String(body.open_from)]);
    if (HHMM.test(String(body.open_to))) next.push(["open_to", String(body.open_to)]);
    if (typeof body.paused === "boolean") next.push(["paused", body.paused ? "1" : "0"]);
    if (Number.isInteger(body.prep_minutes) && body.prep_minutes >= 0 && body.prep_minutes <= 240)
      next.push(["prep_minutes", String(body.prep_minutes)]);
    if (Array.isArray(body.closed_weekdays)) {
      const days = [...new Set(body.closed_weekdays.map(Number).filter((n: number) => n >= 0 && n <= 6))];
      next.push(["closed_weekdays", days.join(",")]);
    }
    for (const k of ["notice_sq", "notice_mk"] as const)
      if (typeof body[k] === "string") next.push([k, body[k].trim().slice(0, 200)]);

    const from = next.find(([k]) => k === "open_from")?.[1];
    const to = next.find(([k]) => k === "open_to")?.[1];
    if (from && to && toMinutes(to) <= toMinutes(from))
      return Response.json({ error: "bad_hours" }, { status: 400 });

    for (const [key, value] of next)
      await db.sql`
        INSERT INTO settings (key, value) VALUES (${key}, ${value})
        ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value`;

    const settings = await loadSettings(db);
    return Response.json({ ok: true, service: serviceState(settings), settings });
  }

  /* --- a new company signs up: mint a slug for its QR code --- */
  if (action === "location-add") {
    const name = String(body.name || "").trim().slice(0, 80);
    if (!name) return Response.json({ error: "name_required" }, { status: 400 });
    const street = String(body.street || "").trim().slice(0, 120) || null;
    const phone = String(body.phone || "").trim().slice(0, 40) || null;

    const taken = new Set(
      ((await db.sql`SELECT slug FROM locations`) as any[]).map((r) => r.slug)
    );
    let slug = slugify(name);
    if (taken.has(slug)) {
      let n = 2;
      while (taken.has(`${slug}-${n}`)) n++;
      slug = `${slug}-${n}`;
    }
    await db.sql`
      INSERT INTO locations (slug, name, street, phone) VALUES (${slug}, ${name}, ${street}, ${phone})`;
    return Response.json({ ok: true, slug });
  }

  /* --- a company stops taking part: its QR code stops working --- */
  if (action === "location-active") {
    if (typeof body.active !== "boolean")
      return Response.json({ error: "bad_request" }, { status: 400 });
    await db.sql`UPDATE locations SET active = ${body.active} WHERE slug = ${String(body.slug)}`;
    return Response.json({ ok: true });
  }

  /* --- month totals per company, for settling up ---
     Direct orders are nobody's account to settle, but they are still money
     taken, so they come back as one row with a null name. */
  if (action === "month") {
    const rows = await db.sql`
      SELECT l.name, o.location_slug AS slug, COUNT(*)::int AS orders, SUM(o.total)::int AS total
      FROM orders o LEFT JOIN locations l ON l.slug = o.location_slug
      WHERE o.created_at >= date_trunc('month', NOW() AT TIME ZONE 'Europe/Skopje')
        AND o.status = 'done'
      GROUP BY l.name, o.location_slug ORDER BY total DESC`;
    const [totals] = (await db.sql`
      SELECT COUNT(*)::int AS orders, COALESCE(SUM(o.total),0)::int AS total
      FROM orders o
      WHERE o.created_at >= date_trunc('month', NOW() AT TIME ZONE 'Europe/Skopje')
        AND o.status = 'done'`) as any[];
    return Response.json({ rows, totals });
  }

  return Response.json({ error: "unknown_action" }, { status: 400 });
};

export const config: Config = { path: "/api/kitchen" };
