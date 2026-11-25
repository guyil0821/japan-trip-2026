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
const googleRoute = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(hotel)}&destination=${encodeURIComponent(hotel)}&waypoints=${routeStops.slice(1, -1).map(encodeURIComponent).join("%7C")}&travelmode=walking`;
const appleSearch = `https://maps.apple.com/?q=${encodeURIComponent(routeStops.join(" → "))}`;

function LoopDiagram() {
  return <div className="rounded-2xl border border-black/5 bg-white p-3 sm:p-5">
    <div className="mb-3 flex items-center justify-between gap-3">
      <div><p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">Route sketch</p><h3 className="mt-1 font-semibold">两岸闭环示意</h3></div>
      <div className="flex gap-3 text-[11px] text-slate-500"><span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-full bg-sky-800" />去程</span><span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-full bg-sky-300" />回程</span></div>
    </div>
    <svg viewBox="0 0 360 380" role="img" aria-labelledby="loop-title loop-description" className="h-auto w-full">
      <title id="loop-title">隅田川两岸晨跑闭环地图示意图</title>
      <desc id="loop-description">从两国酒店沿河向北，经过浅草后在吾妻桥过河，沿对岸向南，在两国桥再次过河回到酒店。去程和回程分别显示为深浅不同的蓝色箭头。</desc>
      <defs>
        <marker id="outbound-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#075985" /></marker>
        <marker id="return-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#7dd3fc" /></marker>
      </defs>
      <rect x="143" y="34" width="74" height="307" rx="34" fill="#eff8fc" />
      <path d="M180 48v275" stroke="#d7edf7" strokeWidth="1.5" strokeDasharray="4 7" />
      <text x="180" y="194" textAnchor="middle" fill="#64748b" fontSize="10" letterSpacing="1.3" transform="rotate(-90 180 194)">隅田川（すみだがわ）</text>
      <text x="270" y="32" textAnchor="middle" fill="#0369a1" fontSize="10" fontWeight="600" letterSpacing="1">東岸 · 墨田区（すみだく）</text>
      <text x="88" y="32" textAnchor="middle" fill="#64748b" fontSize="10" fontWeight="600" letterSpacing="1">西岸 · 台東区（たいとうく）</text>

      <path d="M246 320 L246 83 Q246 66 228 66 L132 66 Q112 66 112 86" fill="none" stroke="#075985" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" markerMid="url(#outbound-arrow)" markerEnd="url(#outbound-arrow)" />
      <path d="M112 86 L112 310 Q112 330 132 330 L226 330 Q246 330 246 320" fill="none" stroke="#7dd3fc" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" markerMid="url(#return-arrow)" markerEnd="url(#return-arrow)" />
      <path d="M246 83 Q246 66 228 66 L132 66 Q112 66 112 86" fill="none" stroke="#075985" strokeWidth="1" strokeDasharray="3 5" />
      <path d="M112 310 Q112 330 132 330 L226 330 Q246 330 246 320" fill="none" stroke="#7dd3fc" strokeWidth="1" strokeDasharray="3 5" />

      <circle cx="246" cy="320" r="7" fill="#fff" stroke="#075985" strokeWidth="3" />
      <circle cx="246" cy="245" r="4" fill="#075985" />
      <circle cx="246" cy="185" r="4" fill="#075985" />
      <circle cx="246" cy="125" r="4" fill="#075985" />
      <circle cx="112" cy="86" r="6" fill="#fff" stroke="#075985" strokeWidth="3" />
      <circle cx="112" cy="142" r="4" fill="#7dd3fc" />
      <circle cx="112" cy="232" r="4" fill="#7dd3fc" />
      <circle cx="112" cy="310" r="6" fill="#fff" stroke="#7dd3fc" strokeWidth="3" />

      <text x="258" y="117" fill="#172033" fontSize="11" fontWeight="600">駒形（こまがた）</text>
      <text x="258" y="132" fill="#64748b" fontSize="10">蔵前（くらまえ）</text>
      <text x="258" y="177" fill="#172033" fontSize="11" fontWeight="600">両国（りょうごく）</text>
      <text x="258" y="192" fill="#64748b" fontSize="10">隅田川東岸 · 去程</text>
      <text x="258" y="239" fill="#172033" fontSize="11" fontWeight="600">両国 · Hotel</text>
      <text x="258" y="254" fill="#64748b" fontSize="10">起点 / 终点</text>

      <text x="101" y="80" textAnchor="end" fill="#172033" fontSize="11" fontWeight="600">吾妻橋（あづまばし）</text>
      <text x="101" y="96" textAnchor="end" fill="#64748b" fontSize="10">过河 · 吾妻桥</text>
      <text x="101" y="134" textAnchor="end" fill="#172033" fontSize="11" fontWeight="600">浅草（あさくさ）· 雷門（かみなりもん）</text>
      <text x="101" y="150" textAnchor="end" fill="#64748b" fontSize="10">Asakusa · Kaminarimon</text>
      <text x="101" y="225" textAnchor="end" fill="#172033" fontSize="11" fontWeight="600">晴空塔方向河景</text>
      <text x="101" y="241" textAnchor="end" fill="#64748b" fontSize="10">隅田川西岸 · 回程</text>
      <text x="101" y="301" textAnchor="end" fill="#172033" fontSize="11" fontWeight="600">両国橋（りょうごくばし）</text>
      <text x="101" y="317" textAnchor="end" fill="#64748b" fontSize="10">过河 · 回到酒店侧</text>

      <rect x="132" y="51" width="96" height="22" rx="11" fill="#fff" stroke="#dbeafe" />
      <text x="180" y="66" textAnchor="middle" fill="#075985" fontSize="9" fontWeight="600" letterSpacing=".6">吾妻橋 · CROSS</text>
      <rect x="132" y="319" width="96" height="22" rx="11" fill="#fff" stroke="#e0f2fe" />
      <text x="180" y="334" textAnchor="middle" fill="#0369a1" fontSize="9" fontWeight="600" letterSpacing=".6">両国橋 · CROSS</text>
    </svg>
    <p className="mt-2 text-[11px] leading-relaxed text-slate-500">路线为河岸与桥梁关系示意，非比例地图；请按现场步道及通行状况行进。</p>
  </div>;
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
      <p className="mt-2 text-sm leading-relaxed text-slate-600">沿河一岸向北，在吾妻桥（あづまばし）过河；换到另一岸向南，再从两国桥（りょうごくばし）回到酒店，完成不重复的闭环。</p>
      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
        <span className="rounded-full bg-sky-50 px-3 py-1.5 font-medium text-sky-800">约 4.5 km</span>
        <span className="text-slate-500">闭环参考距离 · 实际以步道与现场导航为准</span>
      </div>
    </header>

    <LoopDiagram />

    <div className="rounded-2xl border border-black/5 bg-white p-4 sm:p-5">
      <div className="mb-4 flex items-center gap-2"><Waves className="h-4 w-4 text-sky-700" /><h2 className="font-semibold">路线分段</h2></div>
      <div className="space-y-4">
        <RouteLeg icon={ArrowUpRight} label="Outbound / 去程 · 隅田川东岸" title="THE GATE HOTEL RYOGOKU（両国・りょうごく）→ 吾妻橋（あづまばし）" detail="从酒店接入 Ryogoku River Terrace（両国・りょうごく），沿东岸向北跑，经蔵前（くらまえ）、駒形（こまがた）至吾妻橋（あづまばし）；浅草（あさくさ）与雷門（かみなりもん）在过桥后顺路到访。" />
        <RouteLeg icon={ArrowLeftRight} label="Crossing / 过河" title="吾妻橋（あづまばし）→ 浅草（あさくさ） / 雷門（かみなりもん）→ 隅田川西岸" detail="从吾妻橋（あづまばし）过河进入浅草（あさくさ），经过雷門（かみなりもん）附近后接入对岸 Sumida River Terrace（隅田川・すみだがわ）。" />
        <RouteLeg icon={ArrowDownLeft} label="Return / 回程 · 隅田川西岸" title="Sumida River Terrace（隅田川・すみだがわ）→ 両国橋（りょうごくばし）→ 酒店" detail="沿西岸向南跑，欣赏東京スカイツリー（とうきょうすかいつりー）方向河景；到両国橋（りょうごくばし）过河，回到酒店一侧并结束环线。" tone="return" />
      </div>
    </div>

    <div className="rounded-2xl border border-black/5 bg-white p-4 sm:p-5">
      <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-sky-700" /><h2 className="font-semibold">地图 · 搜索定位点</h2></div>
      <p className="mt-2 text-xs leading-relaxed text-slate-500">酒店 → Ryogoku River Terrace（両国・りょうごく）→ 蔵前（くらまえ） / 駒形（こまがた）→ 吾妻橋（あづまばし）→ 浅草（あさくさ） / 雷門（かみなりもん）→ Sumida River Terrace（隅田川・すみだがわ）西岸 → 両国橋（りょうごくばし）→ 酒店</p>
      <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
        <a href={appleSearch} target="_blank" rel="noreferrer" className="flex min-h-11 items-center justify-between rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm font-medium text-slate-800 hover:bg-slate-50">Apple 地图 · 全线定位点<ExternalLink className="h-4 w-4 text-slate-500" /></a>
        <a href={googleRoute} target="_blank" rel="noreferrer" className="flex min-h-11 items-center justify-between rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800">Google Maps · 完整步行环线<ExternalLink className="h-4 w-4" /></a>
      </div>
      <p className="mt-3 text-[11px] leading-relaxed text-slate-500">Google Maps 已将酒店设为起点与终点，并按顺序加入两岸定位点。地图服务可能依据步道开放状况调整具体走法。</p>
    </div>

    <div className="rounded-2xl border border-amber-200/70 bg-amber-50/60 p-4 text-sm leading-relaxed text-amber-900">
      <p className="font-medium">晨跑提示</p>
      <p className="mt-1">桥面及沿河步道请留意行人、自行车与路口信号；若河岸步道临时关闭，请以现场指引为准。约 4.5 km 为参考环线距离，不为凑里程加入上野绕行。</p>
    </div>

    <div className="rounded-2xl border border-black/5 bg-white p-4">
      <h2 className="font-semibold">沿途补给</h2>
      <p className="mt-1 text-sm leading-relaxed text-slate-500">沿线留意便利店与自动售货机；营业时间和设施情况以当天现场为准。</p>
    </div>
  </section>;
}
