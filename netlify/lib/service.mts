/* One place that answers "can someone order right now?".
   The hours live in the settings table so the kitchen can move them, and every
   clock reading is done in Europe/Skopje — the restaurant's own time, UTC+1 in
   winter and UTC+2 in summer. Never compare against the server's UTC hour. */

export const TZ = "Europe/Skopje";

export type Settings = {
  open_from: string;        // "08:00"
  open_to: string;          // "15:00"
  closed_weekdays: number[]; // 0 = Sunday
  paused: boolean;
  prep_minutes: number;
  notice_sq: string;
  notice_mk: string;
};

const DEFAULTS: Settings = {
  open_from: "08:00",
  open_to: "15:00",
  closed_weekdays: [0],
  paused: false,
  prep_minutes: 45,
  notice_sq: "",
  notice_mk: "",
};

const HHMM = /^([01]\d|2[0-3]):([0-5]\d)$/;

export function toMinutes(hhmm: string) {
  const m = HHMM.exec(hhmm);
  return m ? Number(m[1]) * 60 + Number(m[2]) : 0;
}

export function toHHMM(mins: number) {
  const m = ((mins % 1440) + 1440) % 1440;
  return String(Math.floor(m / 60)).padStart(2, "0") + ":" + String(m % 60).padStart(2, "0");
}

/* Reads the settings row by row. A missing table or key falls back to the
   defaults above, so the ordering page keeps working even mid-migration. */
export async function loadSettings(db: any): Promise<Settings> {
  let rows: any[] = [];
  try {
    rows = (await db.sql`SELECT key, value FROM settings`) as any[];
  } catch {
    return { ...DEFAULTS };
  }
  const raw = new Map(rows.map((r) => [r.key, r.value]));
  const str = (k: keyof Settings, d: string) => {
    const v = raw.get(k);
    return typeof v === "string" ? v : d;
  };
  return {
    open_from: HHMM.test(str("open_from", "")) ? str("open_from", "") : DEFAULTS.open_from,
    open_to: HHMM.test(str("open_to", "")) ? str("open_to", "") : DEFAULTS.open_to,
    closed_weekdays: str("closed_weekdays", "0")
      .split(",")
      .map((n) => parseInt(n, 10))
      .filter((n) => n >= 0 && n <= 6),
    paused: str("paused", "0") === "1",
    prep_minutes: Math.min(240, Math.max(0, parseInt(str("prep_minutes", "45"), 10) || 45)),
    notice_sq: str("notice_sq", ""),
    notice_mk: str("notice_mk", ""),
  };
}

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/* Wall-clock time in Skopje, whatever the server's own timezone is. */
export function skopjeNow(at: Date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: TZ,
    hour: "2-digit",
    minute: "2-digit",
    weekday: "short",
    hour12: false,
  }).formatToParts(at);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const hour = parseInt(get("hour"), 10) % 24;
  const minute = parseInt(get("minute"), 10);
  return {
    hour,
    minute,
    minutes: hour * 60 + minute,
    hhmm: toHHMM(hour * 60 + minute),
    weekday: Math.max(0, WEEKDAYS.indexOf(get("weekday"))),
  };
}

export type ServiceState = {
  open: boolean;
  paused: boolean;
  closed_today: boolean;
  from: string;
  to: string;
  now: string;
  /* Minutes until the shutter comes down; null when already shut. */
  minutes_left: number | null;
  /* "today" | "tomorrow" | weekday index of the next day we take orders. */
  next_open: { hhmm: string; in_days: number; weekday: number } | null;
  prep_minutes: number;
  closed_weekdays: number[];
};

export function serviceState(s: Settings, at: Date = new Date()): ServiceState {
  const now = skopjeNow(at);
  const from = toMinutes(s.open_from);
  const to = toMinutes(s.open_to);
  const closedToday = s.closed_weekdays.includes(now.weekday);
  const withinHours = now.minutes >= from && now.minutes < to;
  const open = !s.paused && !closedToday && withinHours;

  let next: ServiceState["next_open"] = null;
  if (!open) {
    /* Today still counts if the kitchen has not opened yet. */
    const startAt = !closedToday && now.minutes < from ? 0 : 1;
    for (let d = startAt; d <= 7; d++) {
      const wd = (now.weekday + d) % 7;
      if (!s.closed_weekdays.includes(wd)) {
        next = { hhmm: s.open_from, in_days: d, weekday: wd };
        break;
      }
    }
  }

  return {
    open,
    paused: s.paused,
    closed_today: closedToday,
    from: s.open_from,
    to: s.open_to,
    now: now.hhmm,
    minutes_left: open ? to - now.minutes : null,
    next_open: next,
    prep_minutes: s.prep_minutes,
    closed_weekdays: s.closed_weekdays,
  };
}

/* When an order placed at `iso` should be on the table, as Skopje wall-clock. */
export function etaFor(iso: string | Date, prepMinutes: number) {
  const placed = typeof iso === "string" ? new Date(iso) : iso;
  const eta = new Date(placed.getTime() + prepMinutes * 60000);
  return skopjeNow(eta).hhmm;
}
