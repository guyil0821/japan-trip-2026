import React, { useState } from "react";
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

const MAP_LAYOUT = { outerInset: 6, labelWidth: 24, routeLeft: 34, routeRight: 66 };
const MAP_LAYOUT_MOBILE = { outerInset: 3, labelWidth: 27, routeLeft: 33, routeRight: 67 };
const ROUTE_Y = { topBridge: 22, asakusa: 27, terrace: 51, kuramae: 42, ryogokuEast: 60, bottomBridge: 73, hotel: 81 };

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

function RouteNode({ type = "outbound", important = false, style = {} }) {
  const color = type === "return" ? ROUTE_COLORS.return : ROUTE_COLORS.outbound;
  return <span className={`route-sketch-node ${important ? "is-important" : ""}`} style={{ ...style, borderColor: color }} aria-hidden="true" />;
}

function MapLocation({ side, top, title, kana, english, Icon, iconColor = ROUTE_COLORS.tree }) {
  const isLeft = side === "left";
  return <div
    className={`route-sketch-location ${isLeft ? "is-left" : "is-right"}`}
    style={{
      top,
      ...(isLeft
        ? { left: `${MAP_LAYOUT.outerInset}%`, width: `${MAP_LAYOUT.labelWidth}%` }
        : { right: `${MAP_LAYOUT.outerInset}%`, width: `${MAP_LAYOUT.labelWidth}%` }),
    }}
  >
    {Icon && <span className="route-sketch-location-icon"><Icon style={{ color: iconColor }} /></span>}
    <div className="route-sketch-location-copy">
      <div className="route-sketch-location-title">{title}</div>
      {kana && <div className="route-sketch-location-kana">{kana}</div>}
      {english && <div className="route-sketch-location-english">{english}</div>}
    </div>
  </div>;
}

function RouteSketch() {
  const canvasStyle = {
    "--map-outer-inset": `${MAP_LAYOUT.outerInset}%`,
    "--map-label-width": `${MAP_LAYOUT.labelWidth}%`,
    "--map-route-left": `${MAP_LAYOUT.routeLeft}%`,
    "--map-route-right": `${MAP_LAYOUT.routeRight}%`,
    "--route-outbound": ROUTE_COLORS.outbound,
    "--route-outbound-soft": ROUTE_COLORS.outboundSoft,
    "--route-return": ROUTE_COLORS.return,
    "--route-return-soft": ROUTE_COLORS.returnSoft,
    "--route-river": ROUTE_COLORS.river,
    "--route-river-text": ROUTE_COLORS.riverText,
    "--route-paper": ROUTE_COLORS.paper,
    "--route-text": ROUTE_COLORS.text,
    "--route-muted": ROUTE_COLORS.muted,
    "--route-faint": ROUTE_COLORS.faint,
    "--route-bridge": ROUTE_COLORS.bridge,
    "--route-tree": ROUTE_COLORS.tree,
    "--route-hotel": ROUTE_COLORS.hotel,
  };

  const routeX = { west: 340, east: 660 };
  const routeY = value => value * 10;

  return <section className="route-sketch-card" style={canvasStyle} aria-label="ROUTE SKETCH / 两岸闭环示意">
    <div className="route-sketch-header">
      <div><p>ROUTE SKETCH</p><h3>两岸闭环示意</h3></div>
      <RouteLegend />
    </div>

    <div className="route-sketch-canvas" role="img" aria-label="概念路线示意：两国酒店沿东岸经过两国、藏前、驹形桥，在吾妻桥过河至西岸，经浅草和隅田川河畔到两国桥，再返回酒店">
      <div className="route-sketch-bank-title route-sketch-west-title"><p>WEST BANK</p><span>西岸 · 台东区</span></div>
      <div className="route-sketch-bank-title route-sketch-east-title"><p>EAST BANK</p><span>东岸 · 墨田区</span></div>

      <div className="route-sketch-river" />
      <div className="route-sketch-river-dash" />
      <div className="route-sketch-river-name">隅田川 · SUMIDA RIVER</div>

      <svg className="route-sketch-lines" viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden="true">
        {/* Soft bridge decks below the routes. */}
        <path d={`M${routeX.west} ${routeY(ROUTE_Y.topBridge)} H${routeX.east}`} stroke={ROUTE_COLORS.bridge} strokeWidth="26" opacity=".25" strokeLinecap="round" />
        <path d={`M${routeX.west} ${routeY(ROUTE_Y.bottomBridge)} H${routeX.east}`} stroke={ROUTE_COLORS.bridge} strokeWidth="26" opacity=".25" strokeLinecap="round" />
        {/* Outbound: hotel north on the east bank, then cross west at Azuma Bridge. */}
        <path d={`M${routeX.east} ${routeY(ROUTE_Y.hotel)} L${routeX.east} ${routeY(ROUTE_Y.ryogokuEast)} L${routeX.east} ${routeY(ROUTE_Y.kuramae)} L${routeX.east} ${routeY(ROUTE_Y.topBridge)} H${routeX.west} L${routeX.west} ${routeY(ROUTE_Y.asakusa)}`} fill="none" stroke={ROUTE_COLORS.outbound} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        {/* Return: west bank walk south to Ryogoku Bridge, cross and reconnect to hotel. */}
        <path d={`M${routeX.west} ${routeY(ROUTE_Y.asakusa)} L${routeX.west} ${routeY(ROUTE_Y.terrace)} L${routeX.west} ${routeY(ROUTE_Y.bottomBridge)} H${routeX.east} L${routeX.east} ${routeY(ROUTE_Y.hotel)}`} fill="none" stroke={ROUTE_COLORS.return} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d={`M${routeX.east - 6} ${routeY(ROUTE_Y.kuramae) + 10} l6 -6 6 6`} fill="none" stroke={ROUTE_COLORS.outboundSoft} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d={`M${routeX.west + 6} ${routeY(ROUTE_Y.terrace) + 10} l-6 6 -6 -6`} fill="none" stroke={ROUTE_COLORS.returnSoft} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <motion.circle r="5" fill={ROUTE_COLORS.outbound}
          animate={{ cx: [routeX.east, routeX.east, routeX.east, routeX.east, routeX.west, routeX.west], cy: [routeY(ROUTE_Y.hotel), routeY(ROUTE_Y.ryogokuEast), routeY(ROUTE_Y.kuramae), routeY(ROUTE_Y.topBridge), routeY(ROUTE_Y.topBridge), routeY(ROUTE_Y.asakusa)] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }} />
        <motion.circle r="4" fill={ROUTE_COLORS.return}
          animate={{ cx: [routeX.west, routeX.west, routeX.west, routeX.east, routeX.east], cy: [routeY(ROUTE_Y.asakusa), routeY(ROUTE_Y.terrace), routeY(ROUTE_Y.bottomBridge), routeY(ROUTE_Y.bottomBridge), routeY(ROUTE_Y.hotel)] }}
          transition={{ duration: 11, repeat: Infinity, ease: "linear", delay: 1 }} />
      </svg>

      {/* Symmetric bank headings use the same inset and label width as location rows. */}
      <div className="route-sketch-bank-title route-sketch-west-title"><p>WEST BANK</p><span>西岸 · 台东区</span></div>
      <div className="route-sketch-bank-title route-sketch-east-title"><p>EAST BANK</p><span>东岸 · 墨田区</span></div>

      {/* Route nodes are separate geographic points, aligned to shared ROUTE_Y coordinates. */}
      <RouteNode type="outbound" style={{ left: `${MAP_LAYOUT.routeRight}%`, top: `${ROUTE_Y.topBridge}%` }} />
      <RouteNode type="return" style={{ left: `${MAP_LAYOUT.routeLeft}%`, top: `${ROUTE_Y.topBridge}%` }} />
      <RouteNode type="return" style={{ left: `${MAP_LAYOUT.routeLeft}%`, top: `${ROUTE_Y.asakusa}%` }} />
      <RouteNode type="return" style={{ left: `${MAP_LAYOUT.routeLeft}%`, top: `${ROUTE_Y.terrace}%` }} />
      <RouteNode style={{ left: `${MAP_LAYOUT.routeRight}%`, top: `${ROUTE_Y.kuramae}%` }} />
      <RouteNode style={{ left: `${MAP_LAYOUT.routeRight}%`, top: `${ROUTE_Y.ryogokuEast}%` }} />
      <RouteNode type="return" style={{ left: `${MAP_LAYOUT.routeLeft}%`, top: `${ROUTE_Y.bottomBridge}%` }} />
      <RouteNode style={{ left: `${MAP_LAYOUT.routeRight}%`, top: `${ROUTE_Y.bottomBridge}%` }} />
      <RouteNode important style={{ left: `${MAP_LAYOUT.routeRight}%`, top: `${ROUTE_Y.hotel}%` }} />

      <MapLocation side="left" top={`${ROUTE_Y.asakusa - 3}%`} title="浅草・雷门" kana="あさくさ・かみなりもん" english="Asakusa · Kaminarimon" Icon={Landmark} iconColor={ROUTE_COLORS.hotel} />
      <MapLocation side="left" top={`${ROUTE_Y.terrace - 3}%`} title="隅田川テラス" kana="すみだがわ" english="Sumida River Terrace" Icon={Trees} iconColor={ROUTE_COLORS.tree} />
      <MapLocation side="left" top={`${ROUTE_Y.bottomBridge - 1}%`} title="两国桥" kana="りょうごくばし" english="过河 · 回到西岸" />

      <MapLocation side="right" top={`${ROUTE_Y.topBridge - 1}%`} title="驹形桥" kana="こまがたばし" english="Komagata Bridge" />
      <MapLocation side="right" top={`${ROUTE_Y.kuramae - 3}%`} title="藏前" kana="くらまえ" english="Kuramae" />
      <MapLocation side="right" top={`${ROUTE_Y.ryogokuEast - 3}%`} title="两国" kana="りょうごく" english="隅田川东岸 · 去程" />
      <MapLocation side="right" top={`${ROUTE_Y.hotel - 3}%`} title="两国酒店" kana="りょうごく" english="Hotel · 起点 / 终点" Icon={House} iconColor={ROUTE_COLORS.hotel} />

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

function SumidaRoute() {
  return <section className="space-y-4 pb-[calc(88px+env(safe-area-inset-bottom))]">
    <header className="rounded-2xl border border-black/5 bg-white p-5 sm:p-6">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-sky-700">Morning run · Ryogoku / Asakusa</p>
      <h1 className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">隅田川两岸晨跑</h1>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">沿河一岸向北，在吾妻桥（あづまばし）过河；换到另一岸向南，再从两国桥（りょうごくばし）过河回到两国酒店，形成闭环路线。</p>
      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
        <span className="rounded-full bg-sky-50 px-3 py-1.5 font-medium text-sky-800">EST. 6–7 KM</span>
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
      <p className="mt-1">桥面及沿河步道请留意行人、自行车与路口信号；若河岸步道临时关闭，请以现场指引为准。EST. 6–7 KM 为参考环线距离，实际以步道状况和导航为准。</p>
    </div>

    <div className="rounded-2xl border border-black/5 bg-white p-4">
      <h2 className="font-semibold">沿途补给</h2>
      <p className="mt-1 text-sm leading-relaxed text-slate-500">沿线留意便利店与自动售货机；营业时间和设施情况以当天现场为准。</p>
    </div>
  </section>;
}

const uenoStops = [
  "THE GATE HOTEL RYOGOKU by HULIC（両国）",
  "Kuramae Bridge（蔵前橋）",
  "Kuramae（蔵前）",
  "Inaricho（稲荷町）",
  "Ueno Park（上野恩賜公園）",
  "Shinobazu Pond（不忍池）",
  "Kaminarimon（雷門）",
  "Azuma Bridge（吾妻橋）",
  "Umaya Bridge（厩橋）",
  "Ryogoku Bridge（両国橋）",
  "THE GATE HOTEL RYOGOKU by HULIC（両国）",
];
const uenoGoogleRoute = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(hotel)}&destination=${encodeURIComponent(hotel)}&waypoints=${uenoStops.slice(1, -1).map(encodeURIComponent).join("%7C")}`;
const uenoAppleSearch = `https://maps.apple.com/?q=${encodeURIComponent(uenoStops.join(" → "))}`;


function UenoRouteSketch() {
  const c = ROUTE_COLORS;
  const city = [
    { x: 67, y: 84, title: "两国酒店", sub: "りょうごく · Hotel · 起点 / 终点", icon: House, tx: 4, ty: 0, side: "right" },
    { x: 63, y: 69, title: "蔵前", sub: "くらまえ · Kuramae", icon: MapPin, tx: 5, ty: 1, side: "right" },
    { x: 53, y: 56, title: "稲荷町", sub: "いなりちょう · Inaricho", icon: MapPin, tx: 3, ty: -7, side: "right" },
    { x: 40, y: 33, title: "上野公園", sub: "うえのこうえん · Ueno Park", icon: Trees, tx: -5, ty: -2, side: "left" },
    { x: 25, y: 46, title: "不忍池", sub: "しのばずのいけ · Shinobazu Pond", icon: Trees, tx: -5, ty: 0, side: "left" },
    { x: 28, y: 62, title: "浅草・雷門", sub: "あさくさ · かみなりもん · Asakusa · Kaminarimon", icon: Landmark, tx: -5, ty: 1, side: "left" },
    { x: 72, y: 48, title: "吾妻橋", sub: "あづまばし · Azuma Bridge", icon: MapPin, tx: -4, ty: -7, side: "left" },
    { x: 72, y: 64, title: "厩橋", sub: "うまやばし · Umaya Bridge", icon: MapPin, tx: -5, ty: 0, side: "left" },
    { x: 72, y: 76, title: "両国橋", sub: "りょうごくばし · Ryogoku Bridge", icon: MapPin, tx: -5, ty: 0, side: "left" },
  ];
  const outbound = [city[0], city[1], city[2], city[3], city[4], city[5], city[6]];
  const returning = [city[6], city[7], city[8], city[0]];
  const pathD = arr => `M${arr.map(n => `${n.x*10} ${n.y*10}`).join(" L")}`;
  const motionXY = arr => ({ cx:arr.map(n=>n.x*10), cy:arr.map(n=>n.y*10) });
  return <section className="route-sketch-card" style={{"--route-outbound":c.outbound,"--route-return":c.return,"--route-river":c.river,"--route-paper":c.paper,"--route-text":c.text,"--route-muted":c.muted}} aria-label="ROUTE SKETCH / 上野浅草闭环示意">
    <div className="route-sketch-header"><div><p>ROUTE SKETCH</p><h3>城市 × 河岸闭环示意</h3></div><RouteLegend /></div>
    <div className="route-sketch-canvas relative min-h-[720px] overflow-hidden" role="img" aria-label="上野浅草城市与隅田川闭环示意">
      <div className="absolute left-[25%] top-[7%] text-center"><p className="text-[9px] font-semibold tracking-[.16em] text-slate-400">NORTH · CITY</p><b className="text-sm text-slate-600">上野 · 台东区</b></div>
      <div className="absolute right-[3%] top-[17%] text-center"><p className="text-[9px] font-semibold tracking-[.16em] text-slate-400">EAST · RIVER</p><b className="text-sm text-slate-600">浅草 · 隅田川</b></div>
      <div className="absolute right-[4%] top-[28%] h-[65%] w-[17%] rounded-[48%] bg-sky-100/70" />
      <div className="absolute right-[10%] top-[53%] rotate-90 text-[9px] tracking-[.18em] text-sky-600/70">隅田川 · SUMIDA RIVER</div>
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden="true">
        <path d={pathD(outbound)} fill="none" stroke={c.outbound} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <path d={pathD(returning)} fill="none" stroke={c.return} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        {city.map((n,i)=><circle key={i} cx={n.x*10} cy={n.y*10} r={i===0?11:7} fill={c.paper} stroke={i>=7?c.return:c.outbound} strokeWidth="4" />)}
        <motion.circle r="6" fill={c.outbound} animate={motionXY(outbound)} transition={{duration:12,repeat:Infinity,ease:"linear"}} />
        <motion.circle r="5" fill={c.return} animate={motionXY(returning)} transition={{duration:6,repeat:Infinity,ease:"linear",delay:.6}} />
      </svg>
      {city.map(({x,y,title,sub,icon:Icon,tx,ty,side}) => <div key={title} className={`absolute flex items-start gap-2 ${side === "left" ? "text-right flex-row-reverse" : "text-left"}`} style={{left:`${x+tx}%`,top:`${y+ty}%`,transform:side==="left"?"translate(-100%,-50%)":"translate(0,-50%)"}}>
        <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#879487]" />
        <span className="whitespace-nowrap rounded-md bg-[#fbf7ed]/90 px-1.5 py-1"><b className="block text-[13px] font-semibold leading-tight text-slate-700">{title}</b><small className="mt-0.5 block text-[9px] font-normal leading-tight text-slate-400">{sub}</small></span>
      </div>)}
      <p className="absolute bottom-2 left-5 right-5 text-[10px] leading-relaxed text-slate-400">概念路线示意，非比例地图。城市段扩大并向左展开，吾妻桥后进入独立河岸轴；地点标签与路线错位摆放，避免遮挡。</p>
    </div>
  </section>;
}

function UenoRoute() {
  return <section className="space-y-4">
    <header className="rounded-2xl border border-black/5 bg-white p-5 sm:p-6">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-sky-700">Morning run · Ueno / Asakusa</p>
      <h1 className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">上野浅草城市环线</h1>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">从两国酒店出发，经蔵前、稲荷町跑入上野公园与不忍池，再转入浅草，沿隅田川返回两国。</p>
      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
        <span className="rounded-full bg-sky-50 px-3 py-1.5 font-medium text-sky-800">EST. 8 KM</span>
        <span className="text-slate-500">城市 × 河岸闭环 · 实际以现场导航为准</span>
      </div>
    </header>
    <UenoRouteSketch />
    <div className="rounded-2xl border border-black/5 bg-white p-4 sm:p-5">
      <div className="mb-4 flex items-center gap-2"><Waves className="h-4 w-4 text-sky-700"/><h2 className="font-semibold">路线分段</h2></div>
      <div className="space-y-4">
        <RouteLeg icon={ArrowUpRight} label="River start / 沿河出发" title="酒店 → 蔵前橋 → 蔵前 → 稲荷町 → 上野公園 → 不忍池" detail="从两国进入城市北段，以不忍池作为路线前半程的主要节点。" />
        <RouteLeg icon={Landmark} label="City turn / 转入浅草" title="不忍池 → 浅草 → 雷門 → 吾妻橋" detail="从上野方向转入浅草，经过雷门后抵达吾妻桥。" />
        <RouteLeg icon={ArrowDownLeft} label="Riverside return / 沿河归程" title="吾妻橋 → 隅田川西岸 → 厩橋 → 蔵前橋 → 両国橋" detail="沿隅田川向南，经桥梁节点回到两国方向。" tone="return" />
        <RouteLeg icon={House} label="Finish / 回到两国" title="両国橋 → THE GATE HOTEL RYOGOKU" detail="过桥后返回酒店，完成城市与河岸结合的闭环路线。" tone="return" />
      </div>
    </div>
    <div className="rounded-2xl border border-black/5 bg-white p-4 sm:p-5">
      <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-sky-700"/><h2 className="font-semibold">地图 · 搜索定位点</h2></div>
      <p className="mt-2 text-xs leading-relaxed text-slate-500">酒店 → 蔵前橋 → 蔵前 → 稲荷町 → 上野公園 → 不忍池 → 浅草 / 雷門 → 吾妻橋 → 厩橋 → 蔵前橋 → 両国橋 → 酒店</p>
      <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
        <a href={uenoAppleSearch} target="_blank" rel="noreferrer" className="flex min-h-11 items-center justify-between rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm font-medium text-slate-800 hover:bg-slate-50">在 Apple 地图中打开 <ExternalLink className="h-4 w-4"/></a>
        <a href={uenoGoogleRoute} target="_blank" rel="noreferrer" className="flex min-h-11 items-center justify-between rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800">在 Google Maps 中打开 <ExternalLink className="h-4 w-4"/></a>
      </div>
      <p className="mt-3 text-[11px] leading-relaxed text-slate-500">8 KM 为预估距离。地图服务可能调整途经点顺序，出发前请复核完整闭环。</p>
    </div>
  </section>;
}

export default function RunningRoute() {
  const [selectedRoute, setSelectedRoute] = useState("sumida");
  return <section className="space-y-4 pb-[calc(88px+env(safe-area-inset-bottom))]">
    <div className="grid grid-cols-2 gap-2 rounded-2xl border border-black/5 bg-white p-1.5" aria-label="选择晨跑路线">
      <button type="button" onClick={() => setSelectedRoute("sumida")} aria-pressed={selectedRoute === "sumida"} className={`rounded-xl px-3 py-3 text-left text-xs font-semibold transition ${selectedRoute === "sumida" ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-50"}`}>
        <span className="block">隅田川</span><span className={`mt-1 block text-[10px] ${selectedRoute === "sumida" ? "text-slate-300" : "text-slate-400"}`}>EST. 6–7 KM</span>
      </button>
      <button type="button" onClick={() => setSelectedRoute("ueno")} aria-pressed={selectedRoute === "ueno"} className={`rounded-xl px-3 py-3 text-left text-xs font-semibold transition ${selectedRoute === "ueno" ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-50"}`}>
        <span className="block">上野浅草</span><span className={`mt-1 block text-[10px] ${selectedRoute === "ueno" ? "text-slate-300" : "text-slate-400"}`}>EST. 8 KM</span>
      </button>
    </div>
    {selectedRoute === "sumida" ? <SumidaRoute /> : <UenoRoute />}
  </section>;
}
