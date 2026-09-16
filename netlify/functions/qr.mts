import QRCode from "qrcode";
import type { Context, Config } from "@netlify/functions";

/* The QR code taped next to each company's coffee machine. Rendered on demand
   as SVG so it prints crisply at any size and never has to be committed.

   `prod=1` encodes the site's canonical address instead of the host that served
   the request — the codes get printed once, so they must not point at a
   deploy-preview URL that disappears next week. */

export default async (req: Request, _context: Context) => {
  const url = new URL(req.url);
  const slug = (url.searchParams.get("k") || "").trim().toLowerCase();
  if (!/^[a-z0-9-]{1,64}$/.test(slug)) {
    return new Response("bad slug", { status: 400 });
  }

  const canonical = Netlify.env.get("URL") || "";
  const base =
    url.searchParams.get("prod") === "1" && /^https:\/\/[\w.-]+$/.test(canonical)
      ? canonical
      : url.origin;

  const target = `${base}/?k=${slug}`;
  const svg = await QRCode.toString(target, {
    type: "svg",
    margin: 1,
    width: 512,
    errorCorrectionLevel: "M",
    color: { dark: "#241413ff", light: "#FBF6F1ff" },
  });

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
      "X-Order-Url": target,
    },
  });
};

export const config: Config = { path: "/api/qr" };
