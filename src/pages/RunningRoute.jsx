import React from "react";
import { ArrowDownLeft, ArrowLeftRight, ArrowUpRight, ExternalLink, MapPin, Waves } from "lucide-react";

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

const sketchRows = [
  {
    west: { name: "吾妻橋", kana: "あづまばし", detail: "过河 · 吾妻桥" },
    east: { name: "駒形橋", kana: "こまがたばし", english: "Komagata Bridge" },
  },
  {
    west: { name: "浅草 · 雷門", kana: "あさくさ · かみなりもん", english: "Asakusa · Kaminarimon" },
    east: { name: "蔵前", kana: "くらまえ", english: "Kuramae" },
  },
  {
    west: { name: "隅田川テラス", kana: "すみだがわ", english: "Sumida River Terrace" },
    east: { name: "両国", kana: "りょうごく", detail: "隅田川东岸 · 去程" },
  },
  {
    west: { name: "両国橋", kana: "りょうごくばし", detail: "过河 · 回到酒店侧" },
    east: { name: "两国酒店", kana: "りょうごく", english: "Hotel · 起点 / 终点" },
  },
];

function PlaceLabel({ place }) {
  return <div className="route-sketch-place">
    <strong>{place.name}</strong>
    <span className="route-sketch-kana">{place.kana}</span>
    {place.english && <span className="route-sketch-english">{place.english}</span>}
    {place.detail && <span className="route-sketch-detail">{place.detail}</span>}
  </div>;
}

function LoopDiagram() {
  return <section className="route-sketch-card" aria-label="Route Sketch 两岸闭环示意">
    <style>{`
      .route-sketch-card { box-sizing:border-box; width:100%; max-width:100%; min-height:390px; padding:20px 24px 72px; overflow:visible; border:1px solid rgba(80,90,70,.16); border-radius:22px; background:var(--paper,#fffaf0); box-shadow:0 4px 15px rgba(78,88,69,.07); }
      .route-sketch-head { display:flex; align-items:center; justify-content:space-between; gap:12px; margin-bottom:14px; }
      .route-sketch-head p { margin:0; color:#718078; font-size:12px; font-weight:600; letter-spacing:.16em; text-transform:uppercase; }
      .route-sketch-head h3 { margin:3px 0 0; color:#34443d; font-size:18px; }
      .route-sketch-legend { display:flex; flex-wrap:wrap; justify-content:flex-end; gap:12px; color:#718078; font-size:11px; }
      .route-sketch-legend span { display:inline-flex; align-items:center; gap:6px; white-space:nowrap; }
      .route-sketch-dot { width:9px; height:9px; border-radius:50%; }
      .route-sketch-body { display:grid; grid-template-columns:minmax(0,1fr) minmax(120px,40%) minmax(0,1fr); align-items:stretch; width:100%; min-height:300px; }
      .route-sketch-bank { display:grid; grid-template-rows:repeat(4,minmax(0,1fr)); min-width:0; }
      .route-sketch-bank h4 { align-self:start; margin:0; color:#526a83; font-size:clamp(16px,2vw,20px); line-height:1.25; }
      .route-sketch-bank--west { text-align:right; }
      .route-sketch-bank--east h4 { color:#58736a; }
      .route-sketch-place { align-self:center; min-width:0; padding:5px 7px; overflow-wrap:anywhere; line-height:1.28; }
      .route-sketch-place strong,.route-sketch-place span { display:block; }
      .route-sketch-place strong { color:#34443d; font-size:clamp(14px,1.7vw,16px); font-weight:700; }
      .route-sketch-kana { margin-top:2px; color:#718078; font-size:clamp(10px,1.25vw,12px); }
      .route-sketch-english,.route-sketch-detail { margin-top:2px; color:#718078; font-size:clamp(9px,1.15vw,11px); }
      .route-sketch-track { display:flex; align-items:center; justify-content:center; min-width:0; }
      .route-sketch-track svg { display:block; width:100%; max-width:100%; height:300px; overflow:visible; }
      .route-sketch-caption { margin:10px 0 0; color:#718078; font-size:11px; line-height:1.5; }
      @media(max-width:600px) {
        .route-sketch-card { padding:18px 24px 72px; }
        .route-sketch-head { align-items:flex-start; }
        .route-sketch-head h3 { font-size:16px; }
        .route-sketch-legend { gap:7px; font-size:10px; }
        .route-sketch-body { grid-template-columns:minmax(0,1fr) minmax(90px,40%) minmax(0,1fr); min-height:290px; }
        .route-sketch-track svg { height:290px; }
        .route-sketch-bank h4 { font-size:15px; }
        .route-sketch-place { padding:4px 2px; }
        .route-sketch-place strong { font-size:14px; }
        .route-sketch-kana { font-size:10px; }
        .route-sketch-english,.route-sketch-detail { font-size:9px; }
      }
      @media(max-width:360px) {
        .route-sketch-card { padding-right:24px; padding-left:24px; }
        .route-sketch-body { grid-template-columns:minmax(0,1fr) minmax(78px,40%) minmax(0,1fr); }
      }
    `}</style>
    <header className="route-sketch-head">
      <div><p>Route Sketch</p><h3>两岸闭环示意</h3></div>
      <div className="route-sketch-legend" aria-label="路线图例">
        <span><i className="route-sketch-dot" style={{ background: "#58736A" }} />去程</span>
        <span><i className="route-sketch-dot" style={{ background: "#67BFE8" }} />回程</span>
      </div>
    </header>

    <div className="route-sketch-body">
      <div className="route-sketch-bank route-sketch-bank--west">
        <h4>西岸 · 台東区<br />（たいとうく）</h4>
        {sketchRows.map(row => <PlaceLabel key={`west-${row.west.name}`} place={row.west} />)}
      </div>

      <div className="route-sketch-track">
        <svg viewBox="0 0 160 300" role="img" aria-labelledby="loop-title loop-description" preserveAspectRatio="xMidYMid meet">
          <title id="loop-title">隅田川两岸晨跑闭环地图示意图</title>
          <desc id="loop-description">东岸向北，在吾妻桥过河到西岸，沿西岸向南，再从两国桥过河回到酒店。去程为森林绿，回程为浅蓝色。</desc>
          <defs>
            <marker id="route-outbound-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0 L10 5 L0 10z" fill="#58736A" /></marker>
            <marker id="route-return-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0 L10 5 L0 10z" fill="#67BFE8" /></marker>
          </defs>
          <rect x="55" y="10" width="50" height="280" rx="25" fill="#DCEBF1" />
          <path d="M80 20v260" stroke="#c5dce5" strokeWidth="2" strokeDasharray="5 8" />
          <text x="80" y="150" fill="#718078" fontSize="9" textAnchor="middle" transform="rotate(-90 80 150)">隅田川 · SUMIDA RIVER</text>
          <path d="M120 275 L120 58 Q120 38 102 38 L58 38 Q40 38 40 58 L40 242 Q40 262 58 262 L102 262 Q120 262 120 275" fill="none" stroke="#58736A" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" markerMid="url(#route-outbound-arrow)" />
          <path d="M120 275 L120 58 Q120 38 102 38 L58 38 Q40 38 40 58 L40 242 Q40 262 58 262 L102 262 Q120 262 120 275" fill="none" stroke="#67BFE8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="0 0" markerEnd="url(#route-return-arrow)" opacity="0" />
          <path d="M40 58 H120" stroke="#F7F2E7" strokeWidth="12" strokeLinecap="round" />
          <path d="M40 262 H120" stroke="#F7F2E7" strokeWidth="12" strokeLinecap="round" />
          <path d="M120 275 L120 58" fill="none" stroke="#58736A" strokeWidth="7" strokeLinecap="round" markerEnd="url(#route-outbound-arrow)" />
          <path d="M40 58 L40 262" fill="none" stroke="#67BFE8" strokeWidth="7" strokeLinecap="round" markerEnd="url(#route-return-arrow)" />
          <path d="M120 275 H40 V262" fill="none" stroke="#67BFE8" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" markerEnd="url(#route-return-arrow)" />
          <path d="M40 58 H120" fill="none" stroke="#58736A" strokeWidth="7" strokeLinecap="round" markerEnd="url(#route-outbound-arrow)" />
          {[58,126,194,262].map(y => <circle key={y} cx={y === 58 || y === 262 ? 40 : 120} cy={y} r="5" fill="#fffaf0" stroke={y < 100 || y > 240 ? "#58736A" : "#67BFE8"} strokeWidth="3" />)}
          <circle cx="120" cy="275" r="7" fill="#fffaf0" stroke="#58736A" strokeWidth="3" />
        </svg>
      </div>

      <div className="route-sketch-bank route-sketch-bank--east">
        <h4>東岸 · 墨田区<br />（すみだく）</h4>
        {sketchRows.map(row => <PlaceLabel key={`east-${row.east.name}`} place={row.east} />)}
      </div>
    </div>
    <p className="route-sketch-caption">路线为河岸与桥梁关系示意，非比例地图；请按现场步道及通行状况行进。</p>
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
  return <section className="space-y-4 pb-2">
    <header className="rounded-2xl border border-black/5 bg-white p-5 sm:p-6">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-sky-700">Morning run · Ryogoku / Asakusa</p>
      <h1 className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">隅田川两岸晨跑</h1>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">沿河一岸向北，在吾妻桥（あづまばし）过河；换到另一岸向南，再从两国桥（りょうごくばし）过河回到两国酒店，形成闭环路线。</p>
      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
        <span className="rounded-full bg-sky-50 px-3 py-1.5 font-medium text-sky-800">约 4.5 km</span>
        <span className="text-slate-500">闭环参考距离 · 实际以步道与现��导航为准</span>
      </div>
    </header>

    <LoopDiagram />

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
