import { getDatabase } from "@netlify/database";
import type { Context, Config } from "@netlify/functions";
import { loadSettings, serviceState } from "../lib/service.mts";

/* What the phone on the factory floor asks for: which company it is,
   what is cooking, and whether the kitchen is still taking orders. */

export default async (req: Request, _context: Context) => {
  const db = getDatabase();
  const slug = new URL(req.url).searchParams.get("k") || "";

  const [settings, location, items] = await Promise.all([
    loadSettings(db),
    slug
      ? db.sql`SELECT slug, name, street FROM locations WHERE slug = ${slug} AND active = TRUE`
      : Promise.resolve([] as any[]),
    db.sql`
      SELECT id, name_sq, name_mk, desc_sq, desc_mk, category, price, photo,
             is_special, is_veg, available
      FROM menu_items ORDER BY sort_order, id`,
  ]);

  const service = serviceState(settings);

  return Response.json(
    {
      location: (location as any[])[0] ?? null,
      items,
      service,
      notice: { sq: settings.notice_sq, mk: settings.notice_mk },
      /* Kept for older tabs that still read `open`. */
      open: service.open,
    },
    { headers: { "Cache-Control": "no-store" } }
  );
};

export const config: Config = { path: "/api/menu" };
