import React from "react";
import { ArrowDownLeft, ArrowLeftRight, ArrowUpRight, ExternalLink, House, Landmark, MapPin, Trees, Waves } from "lucide-react";
import { motion } from "framer-motion";
import "../styles/route-sketch.css";

const ROUTE_COLORS = {
  outbound: "#58736A",
  outboundSoft: "#789086",
  return: "#59BCE8",
  returnSoft: "#A9DDF2",
  river: "#DCEBF1",
  riverText: "#78919A",
  paper: "#FFFAF0",
  page: "#F4EFDD",
  text: "#34443D",
  muted: "#788A83",
  faint: "#A4AEA9",
  bridge: "#C4B58C",
  tree: "#78906E",
  hotel: "#A88865",
};

const hotel = "THE GATE HOTEL RYOGOKU by HULIC, Tokyo";
const routeStops = [
  "THE GATE HOTEL RYOGOKU by HULIC（両国・りょうごく）",
  "Ryogoku River Terrace（両国・りょうごく）",
  "Kuramae Bridge（蔵前橋・くらまえばし）",
  "Komagata Bridge（駒形橋・こまがたばし）",
  "Azuma Bridge（吾妻橋・あづまばし）",
  "Kaminarimon（雷門・かみなりもん）",
  "Sumida River Terrace（隅田川・すみだがわ）",
  "Ryogoku Bridge（両国橋・りょうごくばし）",
  "THE GATE HOTEL RYOGOKU by HULIC（両国・りょうごく）",
];
const googleRoute = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(hotel)}&destination=${encodeURIComponent(hotel)}&waypoints=${routeStops.slice(1, -1).map(encodeURIComponent).join("%7C")}`;
const appleSearch = `https://maps.apple.com/?q=${encodeURIComponent(routeStops.join(" → "))}`;

function RouteLegend() {
  return <div className="route-sketch-legend" aria-label="路线图例">
    <span><i style={{ backgroundColor: ROUTE_COLORS.outbound }} />去程</span>
    <span><i style={{ backgroundColor: ROUTE_COLORS.return }} />回程</span>
  </div>;
}

function RouteNode({ type = "outbound", important = false }) {
  const color = type === "return" ? ROUTE_COLORS.return : ROUTE_COLORS.outbound;
  return <span className={`route-sketch-node ${important ? "is-important" : ""}`} style={{ borderColor: color }} aria-hidden="true" />;
}

function MapLabel({ title, kana, english, align = "left", accent = false }) {
  return <div className={`route-sketch-label ${align === "right" ? "is-right" : "is-left"}`}>
    <div className={`route-sketch-label-title ${accent ? "is-accent" : ""}`}>{title}</div>
    {kana && <div className="route-sketch-label-kana">{kana}</div>}
    {english && <div className="route-sketch-label-english">{english}</div>}
  </div>;
}

function RouteSketch() {
  return <section className="route-sketch-card" aria-label="ROUTE SKETCH / 两岸闭环示意">
    <div className="route-sketch-header">
      <div>
        <p>ROUTE SKETCH</p>
        <h3>两岸闭环示意</h3>
      </div>
      <RouteLegend />
    </div>

    <div className="route-sketch-canvas" role="img" aria-label="概念路线示意：两国酒店沿东岸经过两国、藏前、驹形桥，在吾妻桥过河至西岸，经浅草和隅田川河畔到两国桥，再返回酒店">
      <div className="route-sketch-bank-title route-sketch-west-title">WEST BANK <span>西岸 · 台東区</span></div>
      <div className="route-sketch-bank-title route-sketch-east-title">EAST BANK <span>東岸 · 墨田区</span></div>

      <div className="route-sketch-river" />
      <div className="route-sketch-river-dash" />
      <div className="route-sketch-river-name">隅田川 · SUMIDA RIVER</div>

      <svg className="route-sketch-lines" viewBox="0 0 1000 400" preserveAspectRatio="none" aria-hidden="true">
        {/* Soft bridge decks sit underneath the walking paths. */}
        <path d="M340 88 H660" stroke={ROUTE_COLORS.bridge} strokeWidth="11" opacity=".25" strokeLinecap="round" />
        <path d="M340 310 H660" stroke={ROUTE_COLORS.bridge} strokeWidth="11" opacity=".25" strokeLinecap="round" />
        {/* Outbound: hotel → east bank → Komagata Bridge → Azuma Bridge crossing. */}
        <path d="M660 360 L660 250 L660 190 L660 140 L660 88 H340" fill="none" stroke={ROUTE_COLORS.outbound} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        {/* Return: west bank river walk → Ryogoku Bridge → hotel. */}
        <path d="M340 88 L340 150 L340 220 L340 270 L340 310 H660 L660 360" fill="none" stroke={ROUTE_COLORS.return} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        {/* Quiet direction chevrons (no large arrowheads). */}
        <path d="M654 165 l6 -6 6 6" fill="none" stroke={ROUTE_COLORS.outboundSoft} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M346 245 l-6 6 -6 -6" fill="none" stroke={ROUTE_COLORS.returnSoft} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {/* Slow moving direction markers follow the corresponding route colors. */}
        <motion.circle r="5" fill={ROUTE_COLORS.outbound}
          animate={{ cx: [660, 660, 660, 660, 340], cy: [360, 250, 190, 140, 88] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }} />
        <motion.circle r="4" fill={ROUTE_COLORS.return}
          animate={{ cx: [340, 340, 340, 340, 660, 660], cy: [88, 150, 220, 310, 310, 360] }}
          transition={{ duration: 9, repeat: Infinity, ease: "linear", delay: 1 }} />
      </svg>

      {/* Every location label is anchored beside its corresponding route node. */}
      <div className="route-sketch-point route-sketch-point--asakusa"><RouteNode type="return" /><Landmark className="route-sketch-icon route-sketch-icon--landmark" /><MapLabel title="浅草・雷门" kana="あさくさ・かみなりもん" english="Asakusa · Kaminarimon" /></div>
      <div className="route-sketch-point route-sketch-point--komagata"><RouteNode /><MapLabel title="驹形桥" kana="こまがたばし" english="Komagata Bridge" /></div>
      <div className="route-sketch-point route-sketch-point--terrace"><RouteNode type="return" /><Trees className="route-sketch-icon route-sketch-icon--tree" /><MapLabel title="隅田川テラス" kana="すみだがわ" english="Sumida River Terrace" /></div>
      <div className="route-sketch-point route-sketch-point--kuramae"><RouteNode /><MapLabel title="藏前" kana="くらまえ" english="Kuramae" /></div>
      <div className="route-sketch-point route-sketch-point--ryogoku"><RouteNode /><MapLabel title="两国" kana="りょうごく" english="隅田川东岸 · 去程" /></div>
      <div className="route-sketch-point route-sketch-point--ryogoku-bridge"><RouteNode type="return" /><MapLabel title="两国桥" kana="りょうごくばし" english="过河 · 回到西岸" /></div>
      <div className="route-sketch-point route-sketch-point--hotel"><RouteNode important /><span className="route-sketch-hotel-icon"><House /></span><MapLabel title="两国酒店" kana="りょうごく" english="Hotel · 起点 / 终点" accent /></div>

      <div className="route-sketch-bridge-label route-sketch-bridge-label--azuma">吾妻橋 <span>あづまばし</span></div>
      <div className="route-sketch-bridge-label route-sketch-bridge-label--ryogoku">两国橋 <span>りょうごくばし</span></div>
      <p className="route-sketch-note">路线为河岸与桥梁关系示意，非比例地图；请按现场步道及通行状况行进。</p>
    </div>
  </section>;
}

function RouteLeg({ icon: Icon, label, title, detail, tone = "outbound" }) {
  const isReturn = tone === "return";
  return <div className="flex gap-3">
    <div className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${isReturn ? "bg-sky-50 text-sky-600" : "bg-sky-100 text-sky-800"}`}><Icon className="h-4 w-4" /></div>
    <div className="min-w-0 flex-1 border-b border-black/5 pb-4 last:border-0">
      <p className={`text-[10px] font-semibold uppercase tracking-[0.16em] ${isReturn ? "text-sky-600" : "text-sky-800"}`}>{label}</p>
      <p className="mt-1 text-sm font-semibold text-slate-900">{title}</p>
      <p className="mt-1 text-sm leading-relaxed text-slate-500">{detail}</p>
    </div>
  </div>;
}

export default function RunningRoute() {
  return <section className="space-y-4 pb-[calc(88px+env(safe-area-inset-bottom))]">
    <header className="rounded-2xl border border-black/5 bg-white p-5 sm:p-6">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-sky-700">Morning run · Ryogoku / Asakusa</p>
      <h1 className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">隅田川两岸晨跑</h1>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">沿河一岸向北，在吾妻桥（あづまばし）过河；换到另一岸向南，再从两国桥（りょうごくばし）过河回到两国酒店，形成闭环路线。</p>
      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
        <span className="rounded-full bg-sky-50 px-3 py-1.5 font-medium text-sky-800">约 4.5 km</span>
        <span className="text-slate-500">闭环参考距离 · 实际以步道与现场导航为准</span>
      </div>
    </header>

    <RouteSketch />

    <div className="rounded-2xl border border-black/5 bg-white p-4 sm:p-5">
      <div className="mb-4 flex items-center gap-2"><Waves className="h-4 w-4 text-sky-700" /><h2 className="font-semibold">路线分段</h2></div>
      <div className="space-y-4">
        <RouteLeg icon={ArrowUpRight} label="Outbound / 去程 · 隅田川东岸" title="THE GATE HOTEL RYOGOKU（両国・りょうごく）→ 吾妻橋（あづまばし）" detail="从酒店沿隅田川东岸向北，经过蔵前与駒形方向，前往吾妻桥。" />
        <RouteLeg icon={ArrowLeftRight} label="Crossing / 过河" title="吾妻橋（あづまばし）→ 浅草（あさくさ） / 雷門（かみなりもん）→ 隅田川西岸" detail="在吾妻桥过河，经过浅草与雷门一带，沿西岸河畔继续向南。" />
        <RouteLeg icon={ArrowDownLeft} label="Return / 回程 · 隅田川西岸" title="Sumida River Terrace（隅田川・すみだがわ）→ 両国橋（りょうごくばし）→ 酒店" detail="沿西岸步道南下至两国桥，再次过河回到酒店一侧。" tone="return" />
      </div>
    </div>

    <div className="rounded-2xl border border-black/5 bg-white p-4 sm:p-5">
      <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-sky-700" /><h2 className="font-semibold">地图 · 搜索定位点</h2></div>
      <p className="mt-2 text-xs leading-relaxed text-slate-500">酒店 → Ryogoku River Terrace（両国・りょうごく）→ 蔵前（くらまえ） / 駒形（こまがた）→ 吾妻橋（あづまばし）→ 浅草（あさくさ） / 雷門（かみなりもん）→ 隅田川西岸 → 両国橋（りょうごくばし）→ 酒店</p>
      <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
        <a href={appleSearch} target="_blank" rel="noreferrer" className="flex min-h-11 items-center justify-between rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm font-medium text-slate-800 hover:bg-slate-50">在 Apple 地图中打开 <ExternalLink className="h-4 w-4" /></a>
        <a href={googleRoute} target="_blank" rel="noreferrer" className="flex min-h-11 items-center justify-between rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800">在 Google Maps 中打开 <ExternalLink className="h-4 w-4" /></a>
      </div>
      <p className="mt-3 text-[11px] leading-relaxed text-slate-500">地图服务可能依据步道开放状况调整路线，请以当天现场状况为准。</p>
    </div>

    <div className="rounded-2xl border border-amber-200/70 bg-amber-50/60 p-4 text-sm leading-relaxed text-amber-900">
      <p className="font-medium">晨跑提示</p>
      <p className="mt-1">桥面及沿河步道请留意行人、自行车与路口信号；若河岸步道临时关闭，请以现场指引为准。约 4.5 km 为参考环线距离，实际以步道状况和导航为准。</p>
    </div>

    <div className="rounded-2xl border border-black/5 bg-white p-4">
      <h2 className="font-semibold">沿途补给</h2>
      <p className="mt-1 text-sm leading-relaxed text-slate-500">沿线留意便利店与自动售货机；营业时间和设施情况以当天现场为准。</p>
    </div>
  </section>;
}
