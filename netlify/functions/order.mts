import { getDatabase } from "@netlify/database";
import type { Context, Config } from "@netlify/functions";
import { loadSettings, serviceState, etaFor } from "../lib/service.mts";

/* Prices and availability are re-read from the database here on purpose.
   Never trust the totals the browser sends — a stale tab or a tampered
   request would otherwise write a wrong price into the day's takings. */

/* A code a cook can shout across the kitchen: letter + three digits.
   Unique per destination per day, so two people at Baukop never share one.
   The letter says where it goes without anyone reading further: A for a
   company run, D for a delivery to a private address, P for a pickup. */
const PREFIX = { workplace: "A", delivery: "D", pickup: "P" } as const;

async function freshCode(db: any, slug: string | null, fulfilment: keyof typeof PREFIX) {
  const [{ codes }] = (await db.sql`
    SELECT COALESCE(array_agg(o.code), '{}') AS codes
    FROM orders o
    WHERE o.location_slug IS NOT DISTINCT FROM ${slug}::text
      AND o.created_at >= date_trunc('day', NOW() AT TIME ZONE 'Europe/Skopje')`) as any[];
  const taken = new Set<string>(codes ?? []);
  const p = PREFIX[fulfilment];
  for (let i = 0; i < 40; i++) {
    const code = p + Math.floor(100 + Math.random() * 900);
    if (!taken.has(code)) return code;
  }
  return p + Date.now().toString().slice(-3);
}

/* Loose on purpose: landlines, mobiles and numbers written with spaces, dashes
   or a +389 prefix all have to pass. It only has to be a number someone can
   actually ring back. */
function usablePhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 6 && digits.length <= 15;
}

export default async (req: Request, _context: Context) => {
  const db = getDatabase();
  const url = new URL(req.url);

  /* --- the customer's own tracker: "where is my lunch?" ---
     Always scoped to today. A company order is proved by the slug from its QR
     code; an order placed from the plain link is proved by its own token. */
  if (req.method === "GET") {
    const code = (url.searchParams.get("code") || "").trim().toUpperCase().slice(0, 8);
    const slug = (url.searchParams.get("k") || "").trim();
    const token = (url.searchParams.get("t") || "").trim().slice(0, 64);
    if (!code || (!slug && !token)) return Response.json({ error: "bad_request" }, { status: 400 });

    const settings = await loadSettings(db);
    const [order] = (await db.sql`
      SELECT o.id, o.code, o.person, o.note, o.total, o.status, o.created_at,
             o.accepted_at, o.done_at, o.fulfilment, o.address, o.contact_phone,
             l.name AS location
      FROM orders o
      LEFT JOIN locations l ON l.slug = o.location_slug
      WHERE o.code = ${code}
        AND o.created_at >= date_trunc('day', NOW() AT TIME ZONE 'Europe/Skopje')
        AND (
          (${slug}::text <> '' AND o.location_slug = ${slug}::text)
          OR (${token}::text <> '' AND o.track_token = ${token}::text)
        )
      ORDER BY o.created_at DESC LIMIT 1`) as any[];

    if (!order) return Response.json({ error: "not_found" }, { status: 404 });

    const items = await db.sql`
      SELECT name_sq, name_mk, qty, unit_price, (qty * unit_price)::int AS sum
      FROM order_items WHERE order_id = ${order.id} ORDER BY id`;

    return Response.json(
      { ...order, items, eta: etaFor(order.created_at, settings.prep_minutes) },
      { headers: { "Cache-Control": "no-store" } }
    );
  }

  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });

  let body: any;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "bad_request" }, { status: 400 });
  }

  const slug = String(body.slug || "").trim();
  const person = String(body.person || "").trim().slice(0, 60);
  const note = String(body.note || "").trim().slice(0, 200);
  const phone = String(body.phone || "").trim().slice(0, 40);
  const address = String(body.address || "").trim().slice(0, 200);
  const lines: Array<{ id: number; qty: number }> = Array.isArray(body.items) ? body.items : [];

  if (!person) return Response.json({ error: "name_required" }, { status: 400 });
  if (!lines.length) return Response.json({ error: "empty_basket" }, { status: 400 });

  const settings = await loadSettings(db);
  const service = serviceState(settings);
  if (!service.open) return Response.json({ error: "closed", service }, { status: 409 });

  /* With a slug the food goes to that company, and the QR code on its wall is
     the whole address. Without one it is a walk-up order off the plain link:
     the customer has to say where it goes, or that they are collecting it. */
  let location: { slug: string; name: string } | null = null;
  let fulfilment: "workplace" | "delivery" | "pickup" = "workplace";

  if (slug) {
    [location] = (await db.sql`
      SELECT slug, name FROM locations WHERE slug = ${slug} AND active = TRUE`) as any[];
    if (!location) return Response.json({ error: "unknown_location" }, { status: 400 });
  } else {
    fulfilment = body.mode === "pickup" ? "pickup" : "delivery";
    if (!usablePhone(phone)) return Response.json({ error: "phone_required" }, { status: 400 });
    if (fulfilment === "delivery" && address.length < 5)
      return Response.json({ error: "address_required" }, { status: 400 });
  }

  const ids = lines.map((l) => Number(l.id)).filter(Number.isInteger);
  const rows = (await db.sql`
    SELECT id, name_sq, name_mk, price, available FROM menu_items WHERE id = ANY(${ids})`) as any[];
  const byId = new Map(rows.map((r: any) => [r.id, r]));

  const priced: any[] = [];
  for (const l of lines) {
    const item = byId.get(Number(l.id));
    const qty = Math.min(20, Math.max(1, Math.floor(Number(l.qty) || 0)));
    if (!item) continue;
    if (!item.available) return Response.json({ error: "sold_out", id: item.id }, { status: 409 });
    priced.push({ ...item, qty });
  }
  if (!priced.length) return Response.json({ error: "empty_basket" }, { status: 400 });

  const total = priced.reduce((a, p) => a + p.price * p.qty, 0);
  const code = await freshCode(db, location?.slug ?? null, fulfilment);
  const token = crypto.randomUUID().replace(/-/g, "");

  const client = await db.pool.connect();
  try {
    await client.query("BEGIN");
    const { rows: created } = await client.query(
      `INSERT INTO orders (code, location_slug, person, note, total,
                           fulfilment, contact_phone, address, track_token)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING id, code, created_at`,
      [
        code,
        location?.slug ?? null,
        person,
        note || null,
        total,
        fulfilment,
        location ? null : phone,
        fulfilment === "delivery" ? address : null,
        token,
      ]
    );
    const orderId = created[0].id;
    for (const p of priced) {
      await client.query(
        `INSERT INTO order_items (order_id, item_id, name_sq, name_mk, qty, unit_price)
         VALUES ($1,$2,$3,$4,$5,$6)`,
        [orderId, p.id, p.name_sq, p.name_mk, p.qty, p.price]
      );
    }
    await client.query("COMMIT");

    return Response.json({
      code: created[0].code,
      status: "new",
      total,
      slug: location?.slug ?? "",
      location: location?.name ?? null,
      fulfilment,
      address: fulfilment === "delivery" ? address : null,
      contact_phone: location ? null : phone,
      /* The browser keeps this to follow its own order later on. */
      token,
      created_at: created[0].created_at,
      eta: etaFor(created[0].created_at, settings.prep_minutes),
      prep_minutes: settings.prep_minutes,
      items: priced.map((p) => ({
        name_sq: p.name_sq,
        name_mk: p.name_mk,
        qty: p.qty,
        sum: p.price * p.qty,
      })),
    });
  } catch {
    await client.query("ROLLBACK");
    return Response.json({ error: "save_failed" }, { status: 500 });
  } finally {
    client.release();
  }
};

export const config: Config = { path: "/api/order" };
