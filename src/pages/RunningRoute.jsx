import React from "react";
import { ArrowDownLeft, ArrowLeftRight, ArrowUpRight, ExternalLink, MapPin, Waves } from "lucide-react";

const ROUTE_COLORS = {
  outbound: "#58736A",
  return: "#59BCE8",
  river: "#DCEBF1",
  riverText: "#78919A",
  nodeFill: "#FFF9ED",
  text: "#34443D",
  muted: "#788A83",
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
    <span><i style={{ background: ROUTE_COLORS.outbound }} />去程</span>
    <span><i style={{ background: ROUTE_COLORS.return }} />回程</span>
  </div>;
}

function RouteLocation({ title, kana, subtitle, side = "left", active = false }) {
  return <div className={`route-sketch-location ${side === "left" ? "is-left" : "is-right"} ${active ? "is-active" : ""}`}>
    <div className="route-sketch-title">{title}</div>
    {kana && <div className="route-sketch-kana">{kana}</div>}
    {subtitle && <div className="route-sketch-subtitle">{subtitle}</div>}
  </div>;
}

function RouteGraphic() {
  return <div className="route-sketch-graphic" role="img" aria-label="路线：两国酒店沿东岸经过两国、藏前、驹形桥，在吾妻桥过河至西岸，经浅草和隅田川河岸到两国桥，再返回酒店">
    <div className="route-sketch-river" />
    <div className="route-sketch-river-label">隅田川 · SUMIDA RIVER</div>
    <svg viewBox="0 0 160 204" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <marker id="route-arrow-outbound" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M 1 1 L 8 5 L 1 9" fill="none" stroke={ROUTE_COLORS.outbound} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </marker>
        <marker id="route-arrow-return" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M 1 1 L 8 5 L 1 9" fill="none" stroke={ROUTE_COLORS.return} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </marker>
      </defs>
      {/* East-bank outbound: hotel → Ryogoku → Kuramae → Komagata → Azuma Bridge. */}
      <path d="M124 178 L124 25" fill="none" stroke={ROUTE_COLORS.outbound} strokeWidth="4" strokeLinecap="round" markerEnd="url(#route-arrow-outbound)" />
      <path d="M124 25 H36" fill="none" stroke={ROUTE_COLORS.outbound} strokeWidth="4" strokeLinecap="round" markerEnd="url(#route-arrow-outbound)" />
      {/* West-bank return: Azuma Bridge → Asakusa → Sumida River Terrace → Ryogoku Bridge → hotel. */}
      <path d="M36 25 L36 178" fill="none" stroke={ROUTE_COLORS.return} strokeWidth="4" strokeLinecap="round" markerEnd="url(#route-arrow-return)" />
      <path d="M36 178 H124" fill="none" stroke={ROUTE_COLORS.return} strokeWidth="4" strokeLinecap="round" markerEnd="url(#route-arrow-return)" />
      {/* Horizontal bridge crossings. */}
      <path d="M36 25 H124" fill="none" stroke="#F7F2E7" strokeWidth="8" strokeLinecap="round" />
      <path d="M36 178 H124" fill="none" stroke="#F7F2E7" strokeWidth="8" strokeLinecap="round" />
      <path d="M124 25 H36" fill="none" stroke={ROUTE_COLORS.outbound} strokeWidth="4" strokeLinecap="round" markerEnd="url(#route-arrow-outbound)" />
      <path d="M36 178 H124" fill="none" stroke={ROUTE_COLORS.return} strokeWidth="4" strokeLinecap="round" markerEnd="url(#route-arrow-return)" />
      {/* Route nodes; outlines use the same shared constants as the paths and legend. */}
      <circle cx="124" cy="25" r="6" fill={ROUTE_COLORS.nodeFill} stroke={ROUTE_COLORS.outbound} strokeWidth="3" />
      <circle cx="36" cy="25" r="6" fill={ROUTE_COLORS.nodeFill} stroke={ROUTE_COLORS.outbound} strokeWidth="3" />
      <circle cx="124" cy="76" r="6" fill={ROUTE_COLORS.nodeFill} stroke={ROUTE_COLORS.outbound} strokeWidth="3" />
      <circle cx="36" cy="76" r="6" fill={ROUTE_COLORS.nodeFill} stroke={ROUTE_COLORS.return} strokeWidth="3" />
      <circle cx="124" cy="127" r="6" fill={ROUTE_COLORS.nodeFill} stroke={ROUTE_COLORS.outbound} strokeWidth="3" />
      <circle cx="36" cy="127" r="6" fill={ROUTE_COLORS.nodeFill} stroke={ROUTE_COLORS.return} strokeWidth="3" />
      <circle cx="36" cy="178" r="6" fill={ROUTE_COLORS.nodeFill} stroke={ROUTE_COLORS.return} strokeWidth="3" />
      <circle cx="124" cy="178" r="7" fill={ROUTE_COLORS.nodeFill} stroke={ROUTE_COLORS.outbound} strokeWidth="3" />
    </svg>
    <span className="route-sketch-bridge route-sketch-bridge--top">吾妻桥</span>
    <span className="route-sketch-bridge route-sketch-bridge--bottom">两国桥</span>
  </div>;
}

function RouteSketch() {
  return <section className="route-sketch-card" aria-label="Route Sketch 两岸闭环示意">
    <style>{`
      .route-sketch-card { box-sizing:border-box; width:100%; max-width:760px; min-height:300px; max-height:340px; margin:0 auto; padding:16px; overflow:visible; border:1px solid #DED8C0; border-radius:22px; background:#FFFAF0; box-shadow:0 4px 15px rgba(78,88,69,.06); }
      .route-sketch-header { display:flex; align-items:flex-start; justify-content:space-between; gap:16px; margin-bottom:20px; }
      .route-sketch-heading p { margin:0; color:${ROUTE_COLORS.muted}; font-size:8px; font-weight:700; letter-spacing:.18em; }
      .route-sketch-heading h3 { margin:4px 0 0; color:${ROUTE_COLORS.text}; font-family:var(--font-story,"Kiwi Maru",serif); font-size:17px; font-weight:500; }
      .route-sketch-legend { display:flex; flex-shrink:0; align-items:center; gap:12px; color:${ROUTE_COLORS.muted}; font-size:9px; }
      .route-sketch-legend span { display:flex; align-items:center; gap:6px; white-space:nowrap; }
      .route-sketch-legend i { width:10px; height:10px; flex:none; border-radius:50%; }
      .route-sketch-banks { display:grid; grid-template-columns:minmax(0,1fr) minmax(150px,1.4fr) minmax(0,1fr); align-items:stretch; gap:8px; width:100%; max-width:100%; }
      .route-sketch-bank { display:grid; grid-template-rows:28px repeat(4,minmax(45px,1fr)); min-width:0; }
      .route-sketch-bank-heading { margin:0; color:#526A61; font-size:clamp(12px,1.8vw,16px); font-weight:700; line-height:1.2; }
      .route-sketch-bank--west .route-sketch-bank-heading { text-align:right; }
      .route-sketch-location { align-self:center; min-width:0; padding:2px 3px; white-space:normal; overflow-wrap:anywhere; word-break:normal; line-height:1.35; }
      .route-sketch-location.is-left { text-align:right; }
      .route-sketch-location.is-right { text-align:left; }
      .route-sketch-title { color:${ROUTE_COLORS.text}; font-family:var(--font-story,"Kiwi Maru",serif); font-size:13px; font-weight:500; line-height:1.35; }
      .route-sketch-kana { margin-top:2px; color:${ROUTE_COLORS.muted}; font-size:9px; line-height:1.35; }
      .route-sketch-subtitle { margin-top:2px; color:#86948E; font-size:8px; line-height:1.35; }
      .route-sketch-graphic { position:relative; align-self:stretch; min-width:0; height:232px; }
      .route-sketch-graphic svg { position:absolute; z-index:1; inset:14px 0 14px; display:block; width:100%; height:204px; overflow:visible; }
      .route-sketch-river { position:absolute; z-index:0; top:12px; bottom:12px; left:50%; width:18%; min-width:20px; transform:translateX(-50%); border-radius:40px; background:${ROUTE_COLORS.river}; opacity:.72; }
      .route-sketch-river-label { position:absolute; z-index:0; top:50%; left:50%; color:${ROUTE_COLORS.riverText}; font-size:7px; letter-spacing:.08em; white-space:nowrap; transform:translate(-50%,-50%) rotate(-90deg); }
      .route-sketch-bridge { position:absolute; z-index:2; left:50%; padding:0 4px; color:#526A61; background:#FFFAF0; font-size:9px; line-height:1.2; white-space:nowrap; transform:translateX(-50%); }
      .route-sketch-bridge--top { top:0; }
      .route-sketch-bridge--bottom { bottom:0; }
      @media(max-width:600px) {
        .route-sketch-card { min-height:330px; max-height:none; padding:16px 12px 20px; }
        .route-sketch-header { gap:8px; margin-bottom:18px; }
        .route-sketch-legend { gap:8px; }
        .route-sketch-banks { grid-template-columns:minmax(0,1fr) minmax(120px,1.25fr) minmax(0,1fr); gap:4px; }
        .route-sketch-bank { grid-template-rows:30px repeat(4,minmax(50px,1fr)); }
        .route-sketch-bank-heading { font-size:12px; }
        .route-sketch-location { padding:2px 1px; }
        .route-sketch-title { font-size:12px; }
        .route-sketch-kana { font-size:8px; }
        .route-sketch-subtitle { font-size:7px; }
        .route-sketch-graphic { height:230px; }
        .route-sketch-graphic svg { height:204px; }
      }
      @media(max-width:420px) {
        .route-sketch-banks { grid-template-columns:minmax(92px,.9fr) minmax(120px,1.1fr) minmax(92px,.9fr); gap:2px; }
      }
      @media(max-width:360px) {
        .route-sketch-card { padding-right:8px; padding-left:8px; }
        .route-sketch-banks { grid-template-columns:minmax(84px,.9fr) minmax(105px,1.1fr) minmax(84px,.9fr); gap:1px; }
        .route-sketch-bank-heading { font-size:11px; }
      }
    `}</style>

    <div className="route-sketch-header">
      <div className="route-sketch-heading"><p>ROUTE SKETCH</p><h3>两岸闭环示意</h3></div>
      <RouteLegend />
    </div>

    <div className="route-sketch-banks">
      <div className="route-sketch-bank route-sketch-bank--west">
        <h4 className="route-sketch-bank-heading">西岸・台东区<br />(たいとうく)</h4>
        <RouteLocation title="浅草・雷门" kana="あさくさ・かみなりもん" subtitle="Asakusa · Kaminarimon" side="left" />
        <RouteLocation title="隅田川テラス" kana="すみだがわ" subtitle="Sumida River Terrace" side="left" />
        <RouteLocation title="两国桥" kana="りょうごくばし" subtitle="过河 · 回到西岸" side="left" />
        <RouteLocation title="吾妻桥" kana="あづまばし" subtitle="桥梁过河" side="left" />
      </div>

      <RouteGraphic />

      <div className="route-sketch-bank route-sketch-bank--east">
        <h4 className="route-sketch-bank-heading">东岸・墨田区<br />(すみだく)</h4>
        <RouteLocation title="驹形桥" kana="こまがたばし" subtitle="Komagata Bridge" side="right" />
        <RouteLocation title="藏前" kana="くらまえ" subtitle="Kuramae" side="right" />
        <RouteLocation title="两国" kana="りょうごく" subtitle="隅田川东岸 · 去程" side="right" />
        <RouteLocation title="两国酒店" kana="りょうごく" subtitle="Hotel · 起点 / 终点" side="right" active />
      </div>
    </div>
    <p className="mt-2 text-[10px] leading-relaxed text-[#788A83]">路线为河岸与桥梁关系示意，非比例地图；请按现场步道及通行状况行进。</p>
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
