/* Të Abija — the ordering screen. Two ways in, and they are not the same:

   ?k=<slug>  a company's QR code on the wall. The slug names the company, the
              food goes to that company's kitchen, and the page greets it.
   no ?k=     the plain link, open to anyone. Nobody's company is named — the
              customer types the address the food should come to, or chooses to
              collect it at the restaurant.

   Everything is re-rendered from `s` on change: no framework, and the whole
   thing has to stay usable one-handed on a phone in a workshop. */

const T = {
  sq: {
    sub: "Kuzhina Popullore",
    openNow: "Hapur — mbyllet në",
    closesIn: "edhe",
    closedNow: "Mbyllur tani",
    opensToday: "hapet sot në",
    opensTomorrow: "hapet nesër në",
    opensOn: "hapet",
    at: "në",
    hoursTitle: "Orari i porosive",
    deliveryTitle: "Dorëzimi",
    deliveryIn: "~{n} min pas porosisë, në vendin tuaj të punës",
    payCash: "Paguhet me dorëzim",
    pausedTitle: "Kuzhina e ndali marrjen e porosive",
    pausedBody: "Ka shumë punë për momentin. Provo përsëri pas pak.",
    closedTitle: "Kuzhina është mbyllur",
    closedBody: "Porositë merren nga {from} deri në {to}. Menyja mund të shihet edhe tani.",
    closedDayBody: "Sot nuk punojmë. {next}.",
    search: "Kërko gatim…",
    fAll: "Të gjitha", fToday: "Sot", fVeg: "Pa mish",
    noHits: "Asgjë nuk përputhet me «{q}».",
    noHitsHint: "Provo një fjalë tjetër, ose shiko të gjithë menynë.",
    today: "Sot në kuzhinë",
    special: "Gatimi i ditës",
    soldOut: "Mbaroi",
    basket: "Shporta", total: "Gjithsej", empty: "Shporta është bosh.",
    yourName: "Emri yt", namePh: "p.sh. Arben",
    noteLabel: "Shënim për kuzhinën", notePh: "kati 2, zyra 4, pa qepë…",
    send: "Dërgo porosinë", sending: "Po dërgohet…",
    needName: "Shkruaj emrin që kuzhina të dijë për kë është.",
    sent: "Porosia u dërgua", orderNo: "Numri i porosisë",
    etaAt: "Pritet rreth {t}",
    stNew: "Pranuar", stPrep: "Në gatim", stDone: "Dorëzuar",
    sdNew: "Kuzhina e ka porosinë tuaj.",
    sdPrep: "Gatimi ka nisur.",
    sdDone: "Ushqimi arriti. Ju bëftë mirë!",
    inKitchen: "Porosia {code} është në kuzhinë",
    onTable: "Porosia {code} u dorëzua",
    seeOrder: "Shiko",
    payNote: "Paguhet me dorëzim, në dorë. Numri i porosisë thuhet kur ta sjellin.",
    newOrder: "Bëj një porosi tjetër",
    repeat: "Përsërit porosinë e fundit",
    den: "den", min: "min", h: "h",
    cats: { main: "Gatime kryesore", grill: "Nga skara", pite: "Pite", side: "Anësore",
      soda: "Pije të gazuara", still: "Pije pa gaz", water: "Ujë", drink: "Pije" },
    noPlace: "Ky kod nuk njihet",
    noPlaceBody: "Skano përsëri kodin QR në vendin e punës, ose telefono restorantin.",
    directTitle: "Porosit drekën",
    directLead: "Zgjidh gatimet, shkruaj adresën — ose merri vetë te restoranti.",
    directWhere: "Porosi direkte",
    qrHint: "Punon në një firmë që ka kod QR në mur? Skanoje dhe adresa vjen vetë.",
    deliveryAny: "~{n} min pas porosisë — dorëzim ose marrje vetë",
    modeTitle: "Si e doni porosinë?",
    modeDelivery: "Me dorëzim",
    modeDeliverySub: "Vjen te adresa juaj",
    modePickup: "Merr vetë",
    modePickupSub: "Vini te restoranti",
    phoneLabel: "Telefoni yt",
    phonePh: "07x xxx xxx",
    addrLabel: "Adresa e dorëzimit",
    addrPh: "rruga, numri, kati, zyra…",
    needPhone: "Shkruaj numrin e telefonit — telefonojmë para se të vijmë.",
    needAddr: "Shkruaj adresën ku duhet të vijë porosia.",
    pickupAt: "Merri te restoranti",
    pickupNote: "Porosia pritet te banaku, e gatshme brenda ~{n} min.",
    deliveryTo: "Dorëzohet në",
    deliveryInAddr: "~{n} min pas porosisë, te adresa juaj",
    payNotePickup: "Paguhet kur e merrni. Numri i porosisë thuhet te banaku.",
    callUs: "Telefono",
    failed: "Porosia nuk u dërgua. Provo përsëri.",
    gone: "Diçka mbaroi ndërkohë. Rifresko faqen.",
    item: "artikull", items: "artikuj",
    dropped: "Dy artikuj nga shporta mbaruan dhe u hoqën.",
    days: ["e diel", "e hënë", "e martë", "e mërkurë", "e enjte", "e premte", "e shtunë"],
  },
  mk: {
    sub: "Народна Кујна",
    openNow: "Отворено — се затвора во",
    closesIn: "уште",
    closedNow: "Затворено",
    opensToday: "отвора денес во",
    opensTomorrow: "отвора утре во",
    opensOn: "отвора",
    at: "во",
    hoursTitle: "Работно време",
    deliveryTitle: "Достава",
    deliveryIn: "~{n} мин по порачката, на вашето работно место",
    payCash: "Плаќање при достава",
    pausedTitle: "Кујната запре со примање порачки",
    pausedBody: "Моментално има многу работа. Обиди се повторно подоцна.",
    closedTitle: "Кујната е затворена",
    closedBody: "Порачки се примаат од {from} до {to}. Менито може да се гледа и сега.",
    closedDayBody: "Денес не работиме. {next}.",
    search: "Барај јадење…",
    fAll: "Сите", fToday: "Денес", fVeg: "Без месо",
    noHits: "Ништо не одговара на «{q}».",
    noHitsHint: "Пробај друг збор, или разгледај го целото мени.",
    today: "Денес во кујна",
    special: "Јадење на денот",
    soldOut: "Снема",
    basket: "Кошничка", total: "Вкупно", empty: "Кошничката е празна.",
    yourName: "Твоето име", namePh: "на пр. Марко",
    noteLabel: "Белешка за кујната", notePh: "кат 2, канцеларија 4, без кромид…",
    send: "Испрати порачка", sending: "Се испраќа…",
    needName: "Напиши го името за да знае кујната за кого е.",
    sent: "Порачката е испратена", orderNo: "Број на порачка",
    etaAt: "Се очекува околу {t}",
    stNew: "Примена", stPrep: "Се готви", stDone: "Доставена",
    sdNew: "Кујната ја има вашата порачка.",
    sdPrep: "Готвењето започна.",
    sdDone: "Храната пристигна. Со здравје!",
    inKitchen: "Порачката {code} е во кујна",
    onTable: "Порачката {code} е доставена",
    seeOrder: "Погледни",
    payNote: "Се плаќа при достава, во рака. Кажи го бројот на порачката кога доаѓа доставата.",
    newOrder: "Направи нова порачка",
    repeat: "Повтори ја последната порачка",
    den: "ден", min: "мин", h: "ч",
    cats: { main: "Главни јадења", grill: "Од скара", pite: "Пити", side: "Прилози",
      soda: "Газирани пијалоци", still: "Негазирани пијалоци", water: "Вода",
      drink: "Пијалоци" },
    noPlace: "Овој код не е познат",
    noPlaceBody: "Скенирај го QR кодот повторно, или јави се во ресторанот.",
    directTitle: "Порачај ручек",
    directLead: "Избери јадења, напиши адреса — или дојди сам по порачката.",
    directWhere: "Директна порачка",
    qrHint: "Работиш во фирма со QR код на ѕидот? Скенирај го и адресата доаѓа сама.",
    deliveryAny: "~{n} мин по порачката — достава или земање",
    modeTitle: "Како ја сакате порачката?",
    modeDelivery: "Со достава",
    modeDeliverySub: "Доаѓа на вашата адреса",
    modePickup: "Земи сам",
    modePickupSub: "Дојдете во ресторанот",
    phoneLabel: "Твојот телефон",
    phonePh: "07x xxx xxx",
    addrLabel: "Адреса за достава",
    addrPh: "улица, број, кат, стан…",
    needPhone: "Напиши телефонски број — се јавуваме пред да дојдеме.",
    needAddr: "Напиши адреса каде треба да дојде порачката.",
    pickupAt: "Земи во ресторанот",
    pickupNote: "Порачката чека на тезгата, готова за ~{n} мин.",
    deliveryTo: "Се доставува на",
    deliveryInAddr: "~{n} мин по порачката, на вашата адреса",
    payNotePickup: "Се плаќа при земање. Кажи го бројот на порачката на тезгата.",
    callUs: "Јави се",
    failed: "Порачката не е испратена. Обиди се повторно.",
    gone: "Нешто снема во меѓувреме. Освежи ја страницата.",
    item: "производ", items: "производи",
    dropped: "Некои производи снема и се отстранени од кошничката.",
    days: ["недела", "понеделник", "вторник", "среда", "четврток", "петок", "сабота"],
  },
};

/* Section order down the menu. `drink` is the retired single drinks category:
   nothing uses it now, but it stays last so a row still carrying the old
   key shows up instead of disappearing. */
const CATS = ["main", "grill", "pite", "side", "soda", "still", "water", "drink"];

/* The restaurant's own number and door. They sit beside the logo on every
   screen — on the plain link there is no company to name, and this is the only
   address on the page. */
const TEL = { show: "075 865 799", dial: "+38975865799" };
const ADDR = { sq: "Jadranska Magistrala 1552, Skopje", mk: "Јадранска Магистрала 1552, Скопје" };

const $app = document.getElementById("app");
const $live = document.getElementById("live");

const esc = (v) =>
  String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const fill = (str, vals) => String(str).replace(/\{(\w+)\}/g, (_, k) => vals[k] ?? "");
const today = () => new Date().toISOString().slice(0, 10);

const s = {
  lang: localStorage.getItem("abija-lang") || "sq",
  /* Only a QR code names a company, and only for as long as ?k= is in the URL.
     Nothing is read from storage here on purpose: opening the plain link must
     never bring back the last company scanned on this phone. */
  slug: (new URLSearchParams(location.search).get("k") || "").trim(),
  data: null,
  loadFailed: false,
  cart: {},
  sheet: false,
  busy: false,
  err: "",
  query: "",
  filter: "all",
  done: null,
  active: null,
  mode: localStorage.getItem("abija-mode") === "pickup" ? "pickup" : "delivery",
  form: {
    person: localStorage.getItem("abija-name") || "",
    phone: localStorage.getItem("abija-phone") || "",
    address: localStorage.getItem("abija-addr") || "",
    note: "",
  },
  minutesLeft: null,
  dropped: false,
  focus: null,
};

const L = () => T[s.lang];
/* No company behind this order: it came from the plain link. */
const direct = () => !s.slug;
const nm = (it) => (s.lang === "sq" ? it.name_sq : it.name_mk);
const ds = (it) => (s.lang === "sq" ? it.desc_sq : it.desc_mk);
const open = () => !!s.data?.service?.open;

/* Photos are served through the Netlify Image CDN: one big JPEG on disk,
   resized and re-encoded per slot so a phone on 3G is not pulling 900px
   images for a 66px thumbnail. */
function photo(slug, w, h, cls, alt) {
  if (!slug) return "";
  const u = (mult) =>
    `/.netlify/images?url=${encodeURIComponent("/photos/" + slug + ".jpg")}&w=${w * mult}&h=${h * mult}&fit=cover`;
  return `<img class="${cls}" src="${u(1)}" srcset="${u(1)} 1x, ${u(2)} 2x" width="${w}" height="${h}"
    alt="${esc(alt || "")}" loading="lazy" decoding="async" onerror="this.style.visibility='hidden'">`;
}

const ICON = {
  search: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 4.5 4.5"/></svg>`,
  leaf: `<svg class="leaf" viewBox="0 0 16 16" fill="#4C6B3C" aria-hidden="true"><path d="M14 2C7 2 2.6 5.2 2.6 9.6c0 1 .2 1.9.7 2.7L2 14.2l1.1.8 1.3-1.9c.8.5 1.7.7 2.7.7C11.5 13.8 14 9.4 14 2zm-2 2.4c-.3 5-2.2 7.6-5 7.6-.5 0-1-.1-1.4-.3C7.4 8.6 9.6 6 12 4.4z"/></svg>`,
  phone: `<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.8 2.6 4.3 3.7c-1 .4-1.6 1.5-1.4 2.6C3.8 13.2 11 20.4 17.8 21.5c1.1.2 2.2-.4 2.6-1.4l1.1-2.5c.3-.8 0-1.8-.8-2.2l-3-1.6c-.7-.4-1.6-.2-2.1.4l-1 1.2c-2.5-1.5-4.3-3.3-5.5-5.8l1.2-1c.6-.5.8-1.4.4-2.1L9 3.4c-.4-.8-1.4-1.2-2.2-.8z"/></svg>`,
  bell: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 3a6 6 0 0 0-6 6c0 4-2 5-2 5h16s-2-1-2-5a6 6 0 0 0-6-6z"/><path d="M10.5 20a2 2 0 0 0 3 0"/></svg>`,
  tick: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="m5 13 4.5 4.5L19 7"/></svg>`,
  pot: `<svg width="30" height="30" viewBox="0 0 64 64" aria-hidden="true"><g fill="#FBF6F1"><path d="M32 6c-3 2.6-4.6 5-4.6 7.2 0 2 1.6 3.4 3.2 4.6l1.4 1.1 1.4-1.1c1.6-1.2 3.2-2.6 3.2-4.6C36.6 11 35 8.6 32 6z"/><rect x="12" y="22" width="40" height="5" rx="2.5"/><path d="M15 30h34l-2.4 21.5A5 5 0 0 1 41.6 56H22.4a5 5 0 0 1-5-4.5L15 30z"/><path d="M9 33h4v9H9a4.5 4.5 0 0 1 0-9zM51 33h4a4.5 4.5 0 0 1 0 9h-4v-9z"/></g><g fill="#A80F16"><path d="M32 36.5c-1.4-1.7-4.6-1.3-4.6 1.3 0 2.1 2.9 4.1 4.6 5.5 1.7-1.4 4.6-3.4 4.6-5.5 0-2.6-3.2-3-4.6-1.3z"/><circle cx="23" cy="40" r="1.6"/><circle cx="41" cy="40" r="1.6"/><circle cx="27" cy="47" r="1.2"/><circle cx="37" cy="47" r="1.2"/><circle cx="32" cy="49.5" r="1.2"/></g></svg>`,
};

/* ---------- stored state ---------- */

const cartKey = () => "abija-cart-" + (s.slug || "direkt");

function saveCart() {
  try {
    const live = Object.fromEntries(Object.entries(s.cart).filter(([, q]) => q > 0));
    if (Object.keys(live).length) localStorage.setItem(cartKey(), JSON.stringify(live));
    else localStorage.removeItem(cartKey());
  } catch {}
}

function readJSON(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || "null");
  } catch {
    return null;
  }
}

/* ---------- money + clock ---------- */

const money = (n) => `${n} ${L().den}`;

function leftText(mins) {
  if (mins == null) return "";
  if (mins < 60) return `${mins} ${L().min}`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m ? `${h} ${L().h} ${m} ${L().min}` : `${h} ${L().h}`;
}

function nextOpenText() {
  const n = s.data?.service?.next_open;
  if (!n) return "";
  if (n.in_days === 0) return `${L().opensToday} ${n.hhmm}`;
  if (n.in_days === 1) return `${L().opensTomorrow} ${n.hhmm}`;
  return `${L().opensOn} ${L().days[n.weekday]} ${L().at} ${n.hhmm}`;
}

/* ---------- data ---------- */

async function load() {
  try {
    const r = await fetch("/api/menu?k=" + encodeURIComponent(s.slug));
    if (!r.ok) throw new Error("http " + r.status);
    s.data = await r.json();
    s.loadFailed = false;
    s.minutesLeft = s.data.service?.minutes_left ?? null;

    /* Restore a basket left behind by a dropped connection, minus anything
       that has sold out since. */
    const saved = readJSON(cartKey()) || {};
    const byId = new Map(s.data.items.map((i) => [String(i.id), i]));
    let dropped = false;
    s.cart = {};
    for (const [id, qty] of Object.entries(saved)) {
      const it = byId.get(String(id));
      if (it && it.available) s.cart[id] = Math.min(20, Number(qty) || 0);
      else dropped = true;
    }
    s.dropped = dropped;
    saveCart();

    /* An order placed earlier today keeps its tracker alive across reloads. */
    const act = readJSON("abija-active");
    s.active = act && act.day === today() && act.slug === s.slug ? act : null;
    if (act && (act.day !== today() || act.slug !== s.slug)) localStorage.removeItem("abija-active");
  } catch {
    s.loadFailed = true;
  }
  render();
  if (s.active && !s.done) pollActive();
}

/* A company order proves itself with the slug off its QR code. An order from
   the plain link carries a home address, so it proves itself with the private
   token the server handed back when it was placed. */
async function fetchOrder(code, token) {
  const q = new URLSearchParams({ code });
  if (s.slug) q.set("k", s.slug);
  if (token) q.set("t", token);
  const r = await fetch("/api/order?" + q.toString());
  if (!r.ok) return null;
  return r.json();
}

let pollTimer = null;
async function pollActive() {
  if (pollTimer) clearTimeout(pollTimer);
  const code = s.done?.code || s.active?.code;
  if (!code) return;
  const o = await fetchOrder(code, s.done?.token || s.active?.token);
  if (o) {
    if (s.active) s.active = { ...s.active, status: o.status, eta: o.eta };
    if (s.done) s.done = { ...s.done, ...o };
    if (o.status === "done") {
      localStorage.removeItem("abija-active");
      if (!s.done) s.active = { ...s.active, status: "done" };
    }
    render();
  }
  if (o?.status !== "done") pollTimer = setTimeout(pollActive, 25000);
}

/* ---------- basket ---------- */

function lines() {
  if (!s.data?.items) return [];
  return Object.entries(s.cart)
    .filter(([, q]) => q > 0)
    .map(([id, qty]) => {
      const it = s.data.items.find((x) => x.id === +id);
      return it ? { ...it, qty, sum: it.price * qty } : null;
    })
    .filter(Boolean);
}

const count = () => lines().reduce((a, l) => a + l.qty, 0);
const totalOf = () => lines().reduce((a, l) => a + l.sum, 0);

function bump(id, by) {
  const next = Math.min(20, Math.max(0, (s.cart[id] || 0) + by));
  s.cart[id] = next;
  if (!next) delete s.cart[id];
  saveCart();
  render();
}

/* ---------- view pieces ---------- */

function header() {
  return `<header class="hdr">
    <div class="hrow">${ICON.pot}
      <div class="brand">Të Abija<em>${L().sub}</em></div>
      <a class="tel" href="tel:${TEL.dial}" aria-label="${L().callUs} ${TEL.show}">
        ${ICON.phone}<span class="num">${TEL.show}</span></a>
    </div>
    <div class="hsub">
      <span class="addr">${ADDR[s.lang]}</span>
      <div class="lang" role="group">
        <button class="${s.lang === "sq" ? "on" : ""}" data-lang="sq" lang="sq">SQ</button>
        <button class="${s.lang === "mk" ? "on" : ""}" data-lang="mk" lang="mk">MK</button>
      </div>
    </div></header>`;
}

function stepper(it) {
  const q = s.cart[it.id] || 0;
  if (!q) return `<button class="plus" data-add="${it.id}" aria-label="+ ${esc(nm(it))}">+</button>`;
  return `<div class="stp"><button class="minus" data-sub="${it.id}" aria-label="− ${esc(nm(it))}">−</button>
    <span class="qty">${q}</span>
    <button class="plus" data-add="${it.id}" aria-label="+ ${esc(nm(it))}">+</button></div>`;
}

function action(it) {
  if (!it.available) return `<span class="oflag">${L().soldOut}</span>`;
  if (!open()) return `<span class="rprice num">${money(it.price)}</span>`;
  return stepper(it);
}

function hero() {
  const svc = s.data.service;
  const loc = s.data.location;
  const state = svc.open
    ? `<div class="state live"><span class="dot"></span>${L().openNow} ${svc.to}
        ${s.minutesLeft != null ? `· ${L().closesIn} <span id="countdown" class="num">${leftText(s.minutesLeft)}</span>` : ""}</div>`
    : `<div class="state"><span class="dot"></span>${L().closedNow} · ${nextOpenText()}</div>`;

  /* Scanned a company's code: greet the company by name, in English, because
     that greeting is the one thing every worker on the floor reads the same
     way. The plain link names nobody. */
  const head = loc
    ? `<h1><span class="wel">Welcome</span>${esc(loc.name)}</h1>
       ${loc.street ? `<div class="street">${esc(loc.street)}</div>` : ""}`
    : `<div class="eyebrow">${L().sub}</div>
       <h1>${L().directTitle}</h1>
       <div class="street">${L().directLead}</div>`;

  const promise = loc ? fill(L().deliveryIn, { n: svc.prep_minutes })
                      : fill(L().deliveryAny, { n: svc.prep_minutes });

  return `<section class="hero reveal">
    ${photo("_hero", 520, 240, "", "")}
    <div class="in">
      ${head}
      ${state}
      <div class="promise">
        <div><b class="num">${svc.from}–${svc.to}</b>${L().hoursTitle}</div>
        <div><b>${promise}</b>${L().payCash}</div>
      </div>
      ${loc ? "" : `<div class="qrhint">${L().qrHint}</div>`}
    </div></section>`;
}

function banners() {
  const svc = s.data.service;
  const notice = s.data.notice?.[s.lang];
  let h = "";
  if (notice) h += `<div class="notice">${ICON.bell}<div>${esc(notice)}</div></div>`;
  if (!svc.open) {
    const body = svc.paused
      ? L().pausedBody
      : svc.closed_today
      ? fill(L().closedDayBody, { next: nextOpenText() })
      : fill(L().closedBody, { from: svc.from, to: svc.to });
    const title = svc.paused ? L().pausedTitle : L().closedTitle;
    h += `<div class="shut"><b>${title}</b>${body}</div>`;
  }
  if (s.dropped) h += `<div class="notice">${ICON.bell}<div>${L().dropped}</div></div>`;
  return h;
}

function trackerStrip() {
  if (!s.active || s.done) return "";
  const st = s.active.status || "new";
  const label = st === "done" ? L().onTable : L().inKitchen;
  const sub = st === "done" ? L().sdDone : s.active.eta ? fill(L().etaAt, { t: s.active.eta }) : L().sdNew;
  return `<div class="track"><span class="code num">${esc(s.active.code)}</span>
    <div class="txt">${fill(label, { code: "" }).replace(/\s+/g, " ")}<small>${sub}</small></div>
    <button class="more" data-track>${L().seeOrder}</button></div>`;
}

function matches(it) {
  if (s.filter === "veg" && !it.is_veg) return false;
  if (s.filter === "today" && !it.is_special) return false;
  if (!s.query) return true;
  const q = s.query.toLowerCase();
  return [it.name_sq, it.name_mk, it.desc_sq, it.desc_mk].some((v) => (v || "").toLowerCase().includes(q));
}

function tools() {
  const chip = (k, lab) => `<button class="chip${s.filter === k ? " on" : ""}" data-filter="${k}">${lab}</button>`;
  return `<div class="tools reveal">
    <div class="search">${ICON.search}
      <input id="q" type="search" value="${esc(s.query)}" placeholder="${L().search}"
        autocomplete="off" enterkeyhint="search" aria-label="${L().search}"></div>
    <div class="chips">${chip("all", L().fAll)}${chip("today", L().fToday)}${chip("veg", L().fVeg)}</div>
  </div>`;
}

function rail(groups) {
  if (groups.length < 2) return "";
  return `<nav class="rail" aria-label="${L().today}">` +
    groups.map((g) => `<button data-jump="cat-${g.key}">${g.label}</button>`).join("") + `</nav>`;
}

function specialCard(it) {
  return `<article class="big${it.available ? "" : " out"}">
    ${photo(it.photo, 488, 275, "", nm(it))}
    <span class="ribbon">${L().special}</span>
    <div class="body">
      <h3>${esc(nm(it))}${it.is_veg ? ICON.leaf : ""}</h3>
      ${ds(it) ? `<p>${esc(ds(it))}</p>` : ""}
      <div class="foot">
        <span class="price num">${it.price}<small>${L().den}</small></span>
        ${action(it)}
      </div></div></article>`;
}

function row(it) {
  return `<div class="row${it.available ? "" : " out"}">
    ${photo(it.photo, 66, 66, "th", nm(it))}
    <div class="rbody">
      <div class="rname">${esc(nm(it))}${it.is_veg ? ICON.leaf : ""}</div>
      ${ds(it) ? `<div class="rdesc">${esc(ds(it))}</div>` : ""}
      <div class="rprice num">${money(it.price)}</div>
    </div>
    ${it.available && open() ? stepper(it) : it.available ? "" : `<span class="oflag">${L().soldOut}</span>`}
  </div>`;
}

function menuBody() {
  const shown = s.data.items.filter(matches);
  const specials = shown.filter((i) => i.is_special);
  const groups = CATS.map((key) => ({
    key,
    label: L().cats[key],
    rows: shown.filter((i) => i.category === key && !i.is_special),
  })).filter((g) => g.rows.length);

  if (!shown.length) {
    return `<div class="msg"><b>${fill(L().noHits, { q: esc(s.query) })}</b>${L().noHitsHint}</div>`;
  }

  let h = rail(groups);
  if (specials.length) {
    h += `<section class="today reveal"><div class="head"><h2>${L().today}</h2><span></span></div>` +
      specials.map(specialCard).join("") + `</section>`;
  }
  h += `<div class="grp reveal">` +
    groups.map((g) => `<h3 id="cat-${g.key}">${g.label}</h3>` + g.rows.map(row).join("")).join("") +
    `</div>`;
  return h;
}

function bar() {
  const n = count();
  if (!n || s.sheet) return "";
  return `<div class="bar"><div><b class="num">${money(totalOf())}</b>
    <small>${n} ${n === 1 ? L().item : L().items}</small></div>
    <button class="go" data-open>${L().basket}</button></div>`;
}

function sheet() {
  if (!s.sheet) return "";
  const ls = lines();
  const last = readJSON("abija-last");
  const canRepeat = !ls.length && Array.isArray(last) && last.length;
  const eta = s.data.service.prep_minutes;

  /* Off the plain link the customer picks how the food reaches them, and the
     form grows the fields that choice needs. From a QR code there is nothing
     to ask: it goes to the company on the wall. */
  const modes = direct()
    ? `<div class="modes" role="group" aria-label="${L().modeTitle}">
        <button class="mo${s.mode === "delivery" ? " on" : ""}" data-mode="delivery"
          aria-pressed="${s.mode === "delivery"}">
          <b>${L().modeDelivery}</b><small>${L().modeDeliverySub}</small></button>
        <button class="mo${s.mode === "pickup" ? " on" : ""}" data-mode="pickup"
          aria-pressed="${s.mode === "pickup"}">
          <b>${L().modePickup}</b><small>${L().modePickupSub}</small></button>
      </div>`
    : "";

  const etaLine = !direct()
    ? fill(L().deliveryIn, { n: eta })
    : s.mode === "pickup"
    ? fill(L().pickupNote, { n: eta })
    : fill(L().deliveryInAddr, { n: eta });

  const counter = direct() && s.mode === "pickup"
    ? `<div class="dest"><b>${L().pickupAt}</b>${ADDR[s.lang]}
        <small>${L().hoursTitle}: <span class="num">${s.data.service.from}–${s.data.service.to}</span>
        · <a href="tel:${TEL.dial}">${TEL.show}</a></small></div>`
    : "";

  return `<div class="scrim" data-close></div>
  <div class="sheet" role="dialog" aria-modal="true" aria-label="${L().basket}">
    <div class="handle"></div>
    <h2>${L().basket}</h2>
    <div class="where">${direct() ? L().directWhere : esc(s.data.location.name)}</div>
    ${ls.length
      ? ls.map((l) => `<div class="cl">${photo(l.photo, 46, 46, "", nm(l))}
          <div class="n">${esc(nm(l))}<small class="num">${money(l.price)}</small></div>
          ${stepper(l)}<div class="ls num">${money(l.sum)}</div></div>`).join("")
      : `<p style="color:var(--mute);font-size:.92rem">${L().empty}</p>`}
    ${canRepeat ? `<button class="repeat" data-repeat>${L().repeat}</button>` : ""}
    <div class="sum"><span>${L().total}</span><b class="num">${money(totalOf())}</b></div>
    ${modes}
    <div class="etaline" style="padding-top:10px">${etaLine}</div>
    ${counter}
    <div class="fld"><label for="nm">${L().yourName}</label>
      <input id="nm" value="${esc(s.form.person)}" placeholder="${L().namePh}"
        autocomplete="name" class="${s.err === L().needName ? "bad" : ""}"></div>
    ${direct() ? `<div class="fld"><label for="ph">${L().phoneLabel}</label>
      <input id="ph" type="tel" inputmode="tel" value="${esc(s.form.phone)}" placeholder="${L().phonePh}"
        autocomplete="tel" class="${s.err === L().needPhone ? "bad" : ""}"></div>` : ""}
    ${direct() && s.mode === "delivery" ? `<div class="fld"><label for="ad">${L().addrLabel}</label>
      <input id="ad" value="${esc(s.form.address)}" placeholder="${L().addrPh}"
        autocomplete="street-address" class="${s.err === L().needAddr ? "bad" : ""}"></div>` : ""}
    <div class="fld"><label for="nt">${L().noteLabel}</label>
      <input id="nt" value="${esc(s.form.note)}" placeholder="${L().notePh}" autocomplete="off"></div>
    ${s.err ? `<div class="warn">${esc(s.err)}</div>` : ""}
    <button class="send" data-send ${!ls.length || s.busy ? "disabled" : ""}>
      ${s.busy ? L().sending : L().send}</button>
  </div>`;
}

function confirmation() {
  const o = s.done;
  const stage = { new: 0, prep: 1, done: 2 }[o.status] ?? 0;
  const steps = [
    [L().stNew, L().sdNew],
    [L().stPrep, L().sdPrep],
    [L().stDone, L().sdDone],
  ];
  return `<div class="ok">
    <div class="tick">${ICON.tick}</div>
    <h2>${L().sent}</h2>
    <div class="ono num">${esc(o.code)}</div>
    <div class="olab">${L().orderNo}</div>
    <ul class="steps">${steps.map(([st, sd], i) =>
      `<li class="${i < stage ? "done" : i === stage ? "at" : ""}">
        <span class="mark">${i < stage ? "✓" : i + 1}</span>
        <div><div class="st">${st}</div><div class="sd">${i === stage ? sd : ""}</div></div></li>`).join("")}
    </ul>
    ${o.eta && o.status !== "done" ? `<div class="etaline" style="text-align:center;margin-top:14px">${fill(L().etaAt, { t: o.eta })}</div>` : ""}
    ${o.fulfilment === "pickup"
      ? `<div class="dest"><b>${L().pickupAt}</b>${ADDR[s.lang]}
          <small><a href="tel:${TEL.dial}">${TEL.show}</a></small></div>`
      : o.address
      ? `<div class="dest"><b>${L().deliveryTo}</b>${esc(o.address)}
          ${o.contact_phone ? `<small class="num">${esc(o.contact_phone)}</small>` : ""}</div>`
      : ""}
    <div class="rcp">
      ${(o.items || []).map((i) => `<div class="rl"><span>${i.qty}× ${esc(s.lang === "sq" ? i.name_sq : i.name_mk)}</span>
        <span class="num" style="flex:none">${money(i.sum ?? i.qty * i.unit_price)}</span></div>`).join("")}
      <div class="rl tt"><span>${L().total}</span><span class="num" style="flex:none">${money(o.total)}</span></div>
    </div>
    <p class="foot-note">${o.fulfilment === "pickup" ? L().payNotePickup : L().payNote}</p>
    <button class="again" data-reset>${L().newOrder}</button>
  </div>`;
}

function skeleton() {
  return `<div class="sk skhero"></div><div style="padding:18px">
    <div class="sk" style="height:44px"></div>
    ${[0, 1, 2, 3].map(() => `<div class="skrow"><div class="sk" style="width:66px;height:66px"></div>
      <div style="flex:1"><div class="sk" style="height:13px;width:58%"></div>
      <div class="sk" style="height:11px;width:82%;margin-top:8px"></div></div></div>`).join("")}
  </div>`;
}

function render() {
  const head = header();

  if (s.loadFailed) {
    $app.innerHTML = head + `<div class="msg"><b>${L().failed}</b>
      <button class="again" data-retry>${L().seeOrder}</button></div>`;
    return;
  }
  if (!s.data) {
    $app.innerHTML = head + skeleton();
    return;
  }
  if (s.done) {
    $app.innerHTML = head + confirmation();
    return;
  }
  /* A slug that the database does not know: an old printed code, or a company
     that has left. Without a slug there is nothing to recognise, and the plain
     link is expected to work. */
  if (s.slug && !s.data.location) {
    $app.innerHTML = head + `<div class="msg"><b>${L().noPlace}</b>${L().noPlaceBody}</div>`;
    return;
  }

  $app.innerHTML =
    head + hero() + banners() + trackerStrip() + tools() + menuBody() + bar() + sheet();

  /* Typing in search re-renders the list, so put the caret back. */
  if (s.focus) {
    const el = document.getElementById(s.focus);
    if (el) {
      el.focus();
      if (el.setSelectionRange && el.type !== "search") el.setSelectionRange(el.value.length, el.value.length);
    }
    s.focus = null;
  }
  measureHeader();
  wireRail();
}

/* The category rail sticks directly under the header, and the header is two
   rows tall once the phone number is in it — so measure rather than guess. */
function measureHeader() {
  const h = $app.querySelector(".hdr")?.offsetHeight;
  if (h) document.documentElement.style.setProperty("--hdr-h", h + "px");
}
document.fonts?.ready.then(measureHeader).catch(() => {});

/* Highlights the category the reader is currently inside. */
let railWatcher = null;
function wireRail() {
  railWatcher?.disconnect();
  const buttons = [...document.querySelectorAll(".rail button")];
  if (!buttons.length) return;
  const heads = buttons.map((b) => document.getElementById(b.dataset.jump)).filter(Boolean);
  railWatcher = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        buttons.forEach((b) => b.classList.toggle("on", b.dataset.jump === e.target.id));
      }
    },
    { rootMargin: "-100px 0px -72% 0px" }
  );
  heads.forEach((h) => railWatcher.observe(h));
}

/* ---------- events ---------- */

$app.addEventListener("click", async (e) => {
  const b = e.target.closest("button, .scrim");
  if (!b) return;
  const d = b.dataset;

  if (d.lang) {
    s.lang = d.lang;
    localStorage.setItem("abija-lang", s.lang);
    document.documentElement.lang = s.lang;
    return render();
  }
  if (d.add) return bump(d.add, +1);
  if (d.sub) return bump(d.sub, -1);
  if (d.filter) {
    s.filter = d.filter;
    return render();
  }
  if (d.mode) {
    s.mode = d.mode;
    s.err = "";
    localStorage.setItem("abija-mode", s.mode);
    return render();
  }
  if (d.jump) {
    document.getElementById(d.jump)?.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  if (b.hasAttribute("data-open")) {
    s.sheet = true;
    s.err = "";
    render();
    return void document.getElementById(s.form.person ? "nt" : "nm")?.focus();
  }
  if (b.hasAttribute("data-close")) {
    s.sheet = false;
    return render();
  }
  if (b.hasAttribute("data-retry")) return load();
  if (b.hasAttribute("data-reset")) {
    s.done = null;
    s.cart = {};
    saveCart();
    return load();
  }
  if (b.hasAttribute("data-repeat")) {
    const last = readJSON("abija-last") || [];
    const byId = new Map(s.data.items.map((i) => [String(i.id), i]));
    s.cart = {};
    for (const l of last) {
      const it = byId.get(String(l.id));
      if (it && it.available) s.cart[String(l.id)] = Math.min(20, Number(l.qty) || 1);
    }
    saveCart();
    return render();
  }
  if (b.hasAttribute("data-track")) {
    const o = await fetchOrder(s.active.code, s.active.token);
    if (o) {
      s.done = o;
      render();
      pollActive();
    }
    return;
  }
  if (b.hasAttribute("data-send")) return send();
});

$app.addEventListener("input", (e) => {
  const el = e.target;
  if (el.id === "q") {
    s.query = el.value;
    s.focus = "q";
    return render();
  }
  if (el.id === "nm") s.form.person = el.value;
  if (el.id === "ph") s.form.phone = el.value;
  if (el.id === "ad") s.form.address = el.value;
  if (el.id === "nt") s.form.note = el.value;
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && s.sheet) {
    s.sheet = false;
    render();
  }
});

async function send() {
  const person = s.form.person.trim();
  const phone = s.form.phone.trim();
  const address = s.form.address.trim();

  const stop = (msg, field) => {
    s.err = msg;
    render();
    document.getElementById(field)?.focus();
  };

  if (!person) return stop(L().needName, "nm");
  if (direct()) {
    /* Nobody is walking food to an address without a number to ring. */
    if (phone.replace(/\D/g, "").length < 6) return stop(L().needPhone, "ph");
    if (s.mode === "delivery" && address.length < 5) return stop(L().needAddr, "ad");
  }

  localStorage.setItem("abija-name", person);
  if (direct()) {
    localStorage.setItem("abija-phone", phone);
    if (address) localStorage.setItem("abija-addr", address);
  }
  const items = lines().map((l) => ({ id: l.id, qty: l.qty }));
  s.busy = true;
  s.err = "";
  render();
  try {
    const r = await fetch("/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        slug: s.slug,
        mode: s.mode,
        person,
        phone,
        address,
        note: s.form.note.trim(),
        items,
      }),
    });
    const j = await r.json();
    s.busy = false;
    if (!r.ok) {
      s.err =
        j.error === "closed" ? L().closedTitle
        : j.error === "sold_out" ? L().gone
        : j.error === "phone_required" ? L().needPhone
        : j.error === "address_required" ? L().needAddr
        : L().failed;
      if (j.error === "closed" && j.service) s.data.service = j.service;
      return render();
    }
    localStorage.setItem("abija-last", JSON.stringify(items));
    const act = {
      code: j.code,
      slug: s.slug,
      token: j.token,
      day: today(),
      status: j.status,
      eta: j.eta,
    };
    localStorage.setItem("abija-active", JSON.stringify(act));
    s.active = act;
    s.done = j;
    s.sheet = false;
    s.cart = {};
    s.form.note = "";
    saveCart();
    render();
    $live.textContent = `${L().sent} — ${j.code}`;
    pollActive();
  } catch {
    s.busy = false;
    s.err = L().failed;
    render();
  }
}

/* The countdown ticks without re-rendering, so it never steals the caret. */
setInterval(() => {
  if (s.minutesLeft == null) return;
  s.minutesLeft = Math.max(0, s.minutesLeft - 1);
  const el = document.getElementById("countdown");
  if (el) el.textContent = leftText(s.minutesLeft);
  if (s.minutesLeft === 0) load();
}, 60000);

/* Someone leaves the tab open all morning: pick up sold-out changes on return. */
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible" && !s.done && s.data) load();
});

/* An older build parked the slug here, which made the plain link keep greeting
   whichever company was scanned last. Nothing reads it now; clear it out. */
localStorage.removeItem("abija-k");
document.documentElement.lang = s.lang;
render();
load();
