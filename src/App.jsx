import React, { useEffect, useState } from "react";
import { CalendarDays, MapPin, Train, ShoppingBag, Snowflake, ChevronDown, ChevronUp, RefreshCw, ExternalLink, Plane, Hotel, Utensils, Ticket, ShoppingBag as ShopIcon, Gift, Wifi, ShieldCheck, Bus, Coffee, CircleEllipsis, ReceiptText, Plus, Trash2, WalletCards } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const days = [
  { date: "12/16", city: "成田", title: "上海 → 成田", items: ["抵达日本，入住成田区域酒店", "准备次日启用 JR EAST–SOUTH HOKKAIDO RAIL PASS"] },
  { date: "12/17", city: "青森", title: "成田 → 东京 → 青森", items: ["成田机场 → 东京：N'EX", "东京 → 新青森：东北新干线 Hayabusa", "新青森 → 青森站，入住 ReLabo"] },
  { date: "12/18", city: "函馆", title: "函馆一日往返", items: ["青森 → 新青森 → 新函馆北斗", "函馆一日游", "当天返回青森 ReLabo"] },
  { date: "12/19", city: "青森 → 川崎", title: "八甲田雪景 + 南下关东", items: ["重点：八甲田雪景 + 酸汤温泉，优先安排，不去弘前", "下午返回青森 / ReLabo 取行李", "傍晚前往新青森站", "Hayabusa 38：新青森 17:44 → 东京 21:04", "前往川崎，入住 Hotel Metropolitan Kawasaki"] },
  { date: "12/20", city: "横滨 → 两国", title: "横滨：先观光、后购物", featured: true, items: ["08:30 左右川崎出发", "上午观光：港未来 / Landmark → 汽车道 → 横滨红砖仓库 → 海边散步 → 山下公园 → 元町", "横滨中华街午餐", "下午开始购物，按下方购物清单安排", "购物结束后前往两国，入住 THE GATE HOTEL"] },
  { date: "12/21", city: "东京", title: "晨跑 + 东京主购物日", featured: true, items: ["清晨：两国出发 → 上野公园晨跑（约 8 km）", "白天以东京购物为主，不额外安排远距离景点"] },
  { date: "12/22", city: "东京 → 成田", title: "东京 / 新宿最后购物 + 成田", featured: true, items: ["上午至下午：新宿最后购物，不新增大型景点", "购物结束后取行李，前往成田", "入住 Hotel Nikko Narita"] },
  { date: "12/23", city: "上海", title: "成田 → 上海", items: ["酒店接驳前往成田机场", "返程上海"] },
];

const sightseeingStops = {
  "12/17": [
    { name: "青森站周边", goal: "青森市区自由活动", kind: "散步" },
    { name: "A-FACTORY", goal: "青森站附近逛逛", kind: "景点" },
    { name: "ReLabo Spa / 温泉", goal: "温泉休息", kind: "休息" },
  ],
  "12/18": [
    { name: "函馆朝市", goal: "早餐 / 海鲜美食", kind: "美食" },
    { name: "金森红砖仓库 / Bay Area", goal: "Bay Area 散步", kind: "散步" },
    { name: "八幡坂", goal: "街景散步", kind: "散步" },
    { name: "五棱郭塔 / 五棱郭", goal: "五棱郭观景与园区", kind: "景点" },
    { name: "六花亭五棱郭店", goal: "甜点 / 茶点", kind: "美食" },
    { name: "函馆山夜景", goal: "重点景点", kind: "必去" },
    { name: "Bay Area Christmas Fantasy 圣诞树", goal: "欣赏圣诞树", kind: "景点" },
  ],
  "12/19": [
    { name: "八甲田雪景", goal: "当天重点，优先安排", kind: "必去" },
    { name: "酸汤温泉", goal: "当天重点，优先安排", kind: "必去" },
  ],
  "12/20": [
    { name: "港未来 / Landmark 周边", goal: "从港未来一带开始观光", kind: "散步" },
    { name: "汽车道", goal: "海边步行", kind: "散步" },
    { name: "横滨红砖仓库", goal: "观光散步", kind: "景点" },
    { name: "海边散步", goal: "沿海步行前往山下公园", kind: "散步" },
    { name: "山下公园", goal: "公园散步", kind: "散步" },
    { name: "元町", goal: "街区散步", kind: "散步" },
    { name: "横滨中华街", goal: "午餐 / 中华料理", kind: "美食" },
  ],
  "12/21": [
    { name: "上野公园", goal: "晨跑约 8 km", kind: "散步" },
  ],
  "12/22": [],
};

// Tax Free remains marked unconfirmed unless the store's status has been verified.
const shoppingStops = {
  "12/20": [
    { name: "横浜イサミ Yokohama ISAMI", goal: "拳击用品", required: true },
    { name: "SOGO 横滨｜小仓山庄", goal: "购买伴手礼", required: false },
    { name: "MARK IS みなとみら��", goal: "商场购物，按时间安排", required: false },
    { name: "ABC-MART GRAND STAGE", goal: "女士 Postman / Service Shoes；优先看 Danner，也可看 Sanders 类似款；优先确认 Tax Free", required: false },
    { name: "DENHAM MARINE & WALK YOKOHAMA", goal: "DENHAM 服饰 / 牛仔裤", required: false },
  ],
  "12/21": [
    { name: "#FFFFFFT（千驮谷）", goal: "仅在当天营业时安排", required: false },
    { name: "Levi's Harajuku Flagship", goal: "Levi's 牛仔服饰", required: false },
    { name: "RRL / Ralph Lauren Tokyo Flagship（表参道）", goal: "RRL 服饰", required: true },
    { name: "Vivienne Westwood", goal: "优先选择支持 Tax Free 的门店（到店确认）", required: false },
    { name: "Nine Tailor", goal: "帽饰", required: false },
    { name: "WAREHOUSE & CO. Tokyo", goal: "WAREHOUSE 服饰", required: true },
    { name: "KAPITAL 惠比寿", goal: "KAPITAL 服饰", required: true },
    { name: "Tokyo Naked Store", goal: "按时间选择逛店", required: false },
    { name: "LEGS Craftsman Store", goal: "按时间选择逛店", required: false },
    { name: "Duffle with KAPITAL", goal: "按时间选择逛店", required: false },
  ],
  "12/22": [
    { name: "Arc'teryx", goal: "重点找 Clarkia 系列 Black，4 码", required: false },
    { name: "Alpen TOKYO 新宿", goal: "运动 / 户外用品", required: true },
    { name: "On", goal: "重点看跑鞋，裤子可选", required: false },
    { name: "La Sportiva / SCARPA", goal: "户外鞋款", required: false },
    { name: "Montbell", goal: "户外用品", required: true },
    { name: "MUJI", goal: "仅在顺路且时间允许时安排", required: false },
  ],
};

const initialShop = [{ name: "RRL / WAREHOUSE 腰带", budget: 1000, tag: "必买" }, { name: "WAREHOUSE + KAPITAL 服装", budget: 3000, tag: "重点" }, { name: "女士邮差鞋", budget: 2000, tag: "重点" }, { name: "On 跑鞋", budget: 800, tag: "可选" }, { name: "女士羽绒服", budget: 1800, tag: "重点" }, { name: "乐福鞋", budget: 800, tag: "可选" }, { name: "Montbell", budget: 2000, tag: "重点" }, { name: "MUJI", budget: 500, tag: "查漏" }, { name: "运动衣裤", budget: 1000, tag: "必买" }, { name: "Vivienne Westwood 项链", budget: 2500, tag: "礼物" }, { name: "#FFFFFFT", budget: 500, tag: "礼物" }, { name: "On 袜子", budget: 800, tag: "可选" }];
const transport = [{ date: "12/17", route: "成田机场 → 东京 → 新青森 → 青森", note: "N'EX + 东北新干线 + 奥羽本线", links: [{ label: "JR东日本新干线实时状态", url: "https://traininfo.jreast.co.jp/train_info/shinkansen.aspx" }, { label: "东北新干线运行信息", url: "https://traininfo.jreast.co.jp/train_info/tohoku.aspx" }] }, { date: "12/18", route: "青森 ↔ 函馆", note: "JR 北海道列车运行 / 北海道新干线", links: [{ label: "JR北海道列车运行状况 / 时刻表", url: "https://www3.jrhokkaido.co.jp/trainlocation/index_en.html" }, { label: "Yahoo!换乘查询", url: "https://transit.yahoo.co.jp/" }] }, { date: "12/19", route: "青森 → 东京 → 川崎", note: "建议乘 Hayabusa 38，17:44 → 21:04", links: [{ label: "JR东日本新干线实时状态", url: "https://traininfo.jreast.co.jp/train_info/shinkansen.aspx" }, { label: "Yahoo!换乘查询", url: "https://transit.yahoo.co.jp/" }] }, { date: "12/20", route: "川崎 → 横滨 → 两国", note: "查看 JR / 地铁，抵达前检查实时运营信息", links: [{ label: "Yahoo!换乘查询", url: "https://transit.yahoo.co.jp/" }, { label: "JR东日本关东地区运行信息", url: "https://traininfo.jreast.co.jp/train_info/kanto.aspx" }] }, { date: "12/22", route: "两国 / 新宿 → 成田", note: "尽量预留 30 分钟以上缓冲", links: [{ label: "Yahoo!换乘查询", url: "https://transit.yahoo.co.jp/" }, { label: "JR东日本关东地区运行信息", url: "https://traininfo.jreast.co.jp/train_info/kanto.aspx" }] }];
const categories = { pre: [{ n: "机票", Icon: Plane }, { n: "酒店", Icon: Hotel }, { n: "JR Pass / 车票", Icon: Train }, { n: "签证 / 保险", Icon: ShieldCheck }, { n: "电话卡 / eSIM", Icon: Wifi }, { n: "门票 / 预约", Icon: Ticket }, { n: "行前购物", Icon: ShoppingBag }, { n: "其他", Icon: CircleEllipsis }], trip: [{ n: "餐饮", Icon: Utensils }, { n: "咖啡 / 小吃", Icon: Coffee }, { n: "交通", Icon: Train }, { n: "巴士", Icon: Bus }, { n: "购物", Icon: ShopIcon }, { n: "伴手礼", Icon: Gift }, { n: "门票 / 体验", Icon: Ticket }, { n: "其他", Icon: CircleEllipsis }] };
const RATE_API = date => `https://api.frankfurter.app/${date}?from=JPY&to=CNY`;
const today = () => new Date().toISOString().slice(0, 10);

function mapUrl(place) {
  if (typeof navigator === "undefined") return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place)}`;
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const isChinaRegion = (navigator.language || "").toLowerCase().includes("zh-cn") || timezone === "Asia/Shanghai";
  return isChinaRegion ? `https://maps.apple.com/?q=${encodeURIComponent(place)}` : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place)}`;
}

function SightseeingStops({ date }) {
  const stops = sightseeingStops[date];
  if (!stops) return null;
  return <section className="mx-4 mb-3 rounded-2xl border border-sky-100 bg-sky-50/60 p-3" aria-label="景点与美食">
    <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900"><span aria-hidden="true">📍</span>景点 / Sightseeing</h4>
    {stops.length === 0 ? <p className="text-xs text-slate-500">不安排额外景点，留足购物、取行李和前往成田的时间。</p> : <div className="space-y-2">{stops.map(stop => <article key={stop.name} className="rounded-xl border border-black/5 bg-white p-3">
      <div className="flex items-start justify-between gap-2"><a href={mapUrl(stop.name)} target="_blank" rel="noreferrer" className="min-w-0 text-sm font-medium text-sky-800 underline decoration-sky-200 underline-offset-2">{stop.name}<ExternalLink className="ml-1 inline h-3.5 w-3.5" /></a><span className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-semibold ${stop.kind === "必去" ? "bg-rose-100 text-rose-700" : stop.kind === "美食" ? "bg-orange-100 text-orange-800" : "bg-slate-100 text-slate-600"}`}>{stop.kind}</span></div>
      <p className="mt-1 text-xs leading-5 text-slate-600">{stop.goal}</p>
    </article>)}</div>}
  </section>;
}

function ShoppingStops({ date }) {
  const stops = shoppingStops[date];
  if (!stops) return null;
  return <section className="mx-4 mb-4 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-3" aria-label="必去购物">
    <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900"><span aria-hidden="true">🛍</span>必去购物</h4>
    <div className="space-y-2">{stops.map(stop => <article key={stop.name} className="rounded-xl border border-black/5 bg-white p-3"><div className="flex items-start justify-between gap-2"><a href={mapUrl(stop.name)} target="_blank" rel="noreferrer" className="min-w-0 text-sm font-medium text-sky-800 underline decoration-sky-200 underline-offset-2">{stop.name}<ExternalLink className="ml-1 inline h-3.5 w-3.5" /></a><span className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-semibold ${stop.required ? "bg-rose-100 text-rose-700" : "bg-slate-100 text-slate-500"}`}>{stop.required ? "必去" : "可选"}</span></div><p className="mt-1 text-xs leading-5 text-slate-600">{stop.goal}</p><span className="mt-2 inline-flex rounded-full bg-amber-100 px-2 py-1 text-[10px] font-medium text-amber-800">Tax Free 待确认</span></article>)}</div>
  </section>;
}

export default function App() {
  const [open, setOpen] = useState("12/20"), [tab, setTab] = useState("trip"), [bookTab, setBookTab] = useState("pre"), [entries, setEntries] = useState([]), [draft, setDraft] = useState(null), [updated, setUpdated] = useState(new Date()), [rateLoading, setRateLoading] = useState(false), [rateMessage, setRateMessage] = useState("");
  useEffect(() => { try { const x = localStorage.getItem("sybil-japan-ledger"); if (x) setEntries(JSON.parse(x)); } catch {} }, []);
  useEffect(() => { try { localStorage.setItem("sybil-japan-ledger", JSON.stringify(entries)); } catch {} }, [entries]);
  const total = 20000, planned = initialShop.reduce((s, x) => s + x.budget, 0), money = n => new Intl.NumberFormat("zh-CN", { maximumFractionDigits: 2 }).format(Number(n) || 0), cny = n => `¥${money(n)}`;
  const entryCny = e => e.currency === "JPY" ? Number(e.amount || 0) * Number(e.rate || 0) : Number(e.amount || 0);
  const visible = entries.filter(e => (e.phase || "pre") === bookTab), phaseTotal = visible.reduce((s, e) => s + entryCny(e), 0), grandTotal = entries.reduce((s, e) => s + entryCny(e), 0);
  const startDraft = category => { const date = today(); setDraft({ phase: bookTab, category, amount: "", currency: "CNY", date, rate: "", rateDate: date, note: "" }); setRateMessage(""); };
  const changeCurrency = currency => { setDraft(d => ({ ...d, currency, rate: "", rateDate: d.date })); setRateMessage(currency === "JPY" ? "请查询消费当天的参考汇率，或手动输入中间价。" : ""); };
  const changeDate = date => { setDraft(d => ({ ...d, date, rateDate: date, rate: d.currency === "JPY" ? "" : d.rate })); if (draft?.currency === "JPY") setRateMessage("消费日期已变更，请重新查询汇率。"); };
  const getRate = async () => { if (!draft?.date) return; setRateLoading(true); setRateMessage("正在查询消费日汇率…"); try { const response = await fetch(RATE_API(draft.date)); if (!response.ok) throw Error("汇率查询失败"); const data = await response.json(); const rate = data?.rates?.CNY; if (!Number.isFinite(rate) || rate <= 0) throw Error("没有可用汇率"); setDraft(d => ({ ...d, rate: String(rate), rateDate: data.date || d.date })); setRateMessage(`已获取 ${data.date || draft.date} 的参考汇率，保存后会固定在此笔记录。`); } catch (error) { setRateMessage(`${error.message}，请稍后重试或手动输入消费日中间价。`); } finally { setRateLoading(false); } };
  const addEntry = () => { const amount = Number(draft?.amount), rate = draft?.currency === "JPY" ? Number(draft.rate) : null; if (!draft || !Number.isFinite(amount) || amount <= 0 || (draft.currency === "JPY" && (!Number.isFinite(rate) || rate <= 0))) return; setEntries(es => [{ ...draft, amount, rate, id: Date.now() + Math.random() }, ...es]); setDraft(null); setRateMessage(""); };
  return <div className="min-h-screen bg-[#f7f5f1] text-slate-900 pb-28">
    <header className="sticky top-0 z-30 border-b border-black/5 bg-[#f7f5f1]/90 backdrop-blur-xl"><div className="mx-auto max-w-3xl px-4 py-3 flex justify-between"><div><div className="text-[11px] tracking-widest uppercase text-slate-500">Japan · Dec 2026</div><h1 className="font-semibold">Sybil 的日本旅行</h1></div><Snowflake className="w-5 h-5 text-sky-600" /></div></header>
    <main className="mx-auto max-w-3xl px-4 pt-5"><div className="grid grid-cols-4 gap-1 my-5 p-1 bg-white rounded-xl border text-xs">{[["trip", "行程"], ["budget", "预算"], ["ledger", "实际花费"], ["transport", "交通"]].map(([key, label]) => <button key={key} onClick={() => setTab(key)} className={`rounded-lg py-2 ${tab === key ? "bg-slate-900 text-white" : "text-slate-500"}`}>{label}</button>)}</div>
      {tab === "trip" && <div className="space-y-3">{days.map(d => <motion.article layout key={d.date} className={`rounded-2xl border ${d.featured ? "border-sky-200 bg-sky-50/70" : "border-black/5 bg-white"} overflow-hidden`}><button onClick={() => setOpen(open === d.date ? null : d.date)} className="w-full p-4 text-left flex gap-3"><div className="w-14"><div className="text-xs text-slate-500">DEC</div><div className="text-lg font-bold">{d.date.split("/")[1]}</div></div><div className="flex-1"><div className="text-xs text-sky-700 flex gap-1"><MapPin className="w-3 h-3" />{d.city}</div><h3 className="font-semibold mt-1">{d.title}</h3></div>{open === d.date ? <ChevronUp /> : <ChevronDown />}</button><AnimatePresence>{open === d.date && <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden"><div className="px-4 pb-4 pl-[5.25rem] space-y-2">{d.items.map(x => <div key={x} className="text-sm leading-6">• {x}</div>)}</div><SightseeingStops date={d.date} /><ShoppingStops date={d.date} /></motion.div>}</AnimatePresence></motion.article>)}</div>}
      {tab === "budget" && <section className="space-y-4"><div className="grid grid-cols-2 gap-2"><div className="bg-slate-950 text-white rounded-2xl p-4"><div className="text-xs text-slate-300">购物总预算</div><div className="text-2xl font-bold mt-2">{cny(total)}</div></div><div className="bg-white rounded-2xl p-4 border"><div className="text-xs text-slate-500">计划购物清单</div><div className="text-2xl font-bold mt-2">{cny(planned)}</div></div></div><div className="rounded-2xl bg-slate-950 text-white p-5"><div className="text-xs text-slate-300">实际花费（人民币）</div><div className="text-2xl font-bold mt-2">{cny(grandTotal)}</div></div><div className="bg-white rounded-2xl border overflow-hidden">{initialShop.map((r, i) => <div key={r.name} className={`p-4 flex justify-between ${i ? "border-t" : ""}`}><div><div className="font-medium text-sm">{r.name}</div><div className="text-xs text-slate-500 mt-1">{r.tag}</div></div><b className="text-sm">{cny(r.budget)}</b></div>)}</div></section>}
      {tab === "ledger" && <section className="space-y-4"><div className="rounded-2xl bg-slate-950 text-white p-5"><div className="flex items-center gap-2 text-sm text-slate-300"><WalletCards className="w-4 h-4" />实际花费累计</div><div className="text-3xl font-bold mt-2">{cny(grandTotal)}</div><div className="text-xs text-slate-400 mt-2">日元记录按消费当天保存的汇率折算</div></div><div className="grid grid-cols-2 p-1 bg-white rounded-2xl border">{[["pre", "行前花费"], ["trip", "旅行花费"]].map(([key, label]) => <button key={key} onClick={() => { setBookTab(key); setDraft(null); }} className={`py-2.5 rounded-xl text-sm ${bookTab === key ? "bg-sky-100 text-sky-800" : "text-slate-500"}`}>{label}</button>)}</div><div className="flex justify-between items-end"><div><h2 className="font-semibold">{bookTab === "pre" ? "行前花费记录" : "旅行花费记录"}</h2><p className="text-xs text-slate-500 mt-1">本组折合 {cny(phaseTotal)}</p></div><span className="text-xs text-slate-400">{visible.length} 笔</span></div><div className="grid grid-cols-4 gap-2">{categories[bookTab].map(({ n, Icon }) => <button key={n} onClick={() => startDraft(n)} className="min-h-20 rounded-2xl border p-2 bg-white flex flex-col items-center justify-center gap-2 text-[11px]"><Icon className="w-5 h-5" />{n}</button>)}</div>
        {draft && <div className="bg-white rounded-2xl border p-4"><div className="font-semibold flex items-center gap-2"><ReceiptText className="w-4 h-4" />新增：{draft.category}</div><div className="mt-3"><div className="text-xs text-slate-500 mb-2">记账币种</div><div className="grid grid-cols-2 gap-2"><button type="button" aria-pressed={draft.currency === "CNY"} onClick={() => changeCurrency("CNY")} className={`rounded-xl border-2 py-3 text-sm font-semibold ${draft.currency === "CNY" ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-600"}`}>人民币 CNY</button><button type="button" aria-pressed={draft.currency === "JPY"} onClick={() => changeCurrency("JPY")} className={`rounded-xl border-2 py-3 text-sm font-semibold ${draft.currency === "JPY" ? "border-sky-600 bg-sky-50 text-sky-800" : "border-slate-200 bg-white text-slate-600"}`}>日元 JPY</button></div></div><div className="grid grid-cols-2 gap-2 mt-3"><label className="text-xs text-slate-500">金额（{draft.currency}）<input inputMode="decimal" placeholder={draft.currency === "JPY" ? "输入日元金额" : "输入人民币金额"} value={draft.amount} onChange={e => setDraft({ ...draft, amount: e.target.value.replace(/[^0-9.]/g, "") })} className="mt-1 w-full rounded-xl border px-3 py-2 text-base text-slate-900" /></label><label className="text-xs text-slate-500">消费日期<input type="date" value={draft.date} onChange={e => changeDate(e.target.value)} className="mt-1 w-full rounded-xl border px-3 py-2 text-sm text-slate-900" /></label></div>{draft.currency === "JPY" && <div className="mt-3 rounded-xl bg-amber-50 p-3"><p className="text-xs text-amber-900">填写消费日中间价（1 JPY = ? CNY）；保存后此汇率固定用于折算。</p><label className="block text-xs text-slate-600 mt-3">消费日汇率<input inputMode="decimal" placeholder="例如 0.048" value={draft.rate} onChange={e => { setDraft({ ...draft, rate: e.target.value.replace(/[^0-9.]/g, ""), rateDate: draft.date }); setRateMessage("手动填写的汇率会固定保存在这笔记录中。"); }} className="mt-1 w-full rounded-xl border px-3 py-2 text-sm text-slate-900" /></label><button type="button" disabled={rateLoading || !draft.date} onClick={getRate} className="mt-2 inline-flex items-center gap-2 rounded-lg bg-white border px-3 py-2 text-xs disabled:opacity-50"><RefreshCw className={`w-3 h-3 ${rateLoading ? "animate-spin" : ""}`} />{rateLoading ? "查询中…" : "查询消费日汇率"}</button>{rateMessage && <p className="text-xs text-amber-900 mt-2">{rateMessage}</p>}{Number(draft.amount) > 0 && Number(draft.rate) > 0 && <p className="text-sm mt-2">折合人民币：<b>¥{money(Number(draft.amount) * Number(draft.rate))}</b></p>}</div>}<input placeholder="备注（可选）" value={draft.note} onChange={e => setDraft({ ...draft, note: e.target.value })} className="w-full rounded-xl border px-3 py-2 mt-3 text-sm" /><div className="flex gap-2 mt-3"><button onClick={() => setDraft(null)} className="flex-1 py-2 rounded-xl bg-slate-100">取消</button><button onClick={addEntry} disabled={!Number(draft.amount) || (draft.currency === "JPY" && !Number(draft.rate))} className="flex-1 py-2 rounded-xl bg-slate-900 text-white disabled:opacity-40"><Plus className="w-4 h-4 inline mr-1" />保存记录</button></div></div>}
        <div className="space-y-2">{visible.length === 0 ? <div className="rounded-2xl border border-dashed p-7 text-center text-sm text-slate-400">还没有记录，选择上方类别添加一笔</div> : visible.map(e => <div key={e.id} className="bg-white rounded-2xl border p-3 flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center"><CalendarDays className="w-5 h-5 text-slate-500" /></div><div className="flex-1 min-w-0"><div className="font-medium text-sm">{e.category}</div><div className="text-xs text-slate-500 mt-1">{e.date}{e.note ? ` · ${e.note}` : ""}</div>{e.currency === "JPY" && <div className="text-xs text-slate-400 mt-1">¥{money(e.amount)} JPY · 1 JPY = {Number(e.rate).toFixed(6)} CNY（{e.rateDate || e.date}）</div>}</div><div className="text-right"><b className="text-sm">¥{money(entryCny(e))}</b>{e.currency === "JPY" && <div className="text-[10px] text-slate-400">¥{money(e.amount)} JPY</div>}</div><button aria-label="删除记录" onClick={() => setEntries(es => es.filter(x => x.id !== e.id))} className="p-2 text-slate-400"><Trash2 className="w-4 h-4" /></button></div>)}</div></section>}
      {tab === "transport" && <section className="space-y-4">{transport.map(t => <article key={t.date} className="bg-white rounded-2xl border p-4"><div className="flex gap-3"><b className="bg-slate-900 text-white rounded-lg px-3 py-2 h-fit text-sm">{t.date}</b><div><h3 className="font-semibold">{t.route}</h3><p className="text-sm text-slate-500 mt-1">{t.note}</p></div></div><div className="grid gap-2 mt-4">{t.links.map(l => <a key={l.label} href={l.url} target="_blank" rel="noreferrer" className="flex justify-between rounded-xl bg-slate-50 border px-3 py-3 text-sm text-sky-700">{l.label}<ExternalLink className="w-4 h-4" /></a>)}</div></article>)}</section>}
    </main><nav className="fixed bottom-3 left-1/2 -translate-x-1/2 w-[calc(100%-24px)] max-w-md bg-white/90 backdrop-blur rounded-2xl shadow-xl border p-2 grid grid-cols-4 text-[11px]">{[["trip", "行程", CalendarDays], ["budget", "预算", ShoppingBag], ["ledger", "记账", ReceiptText], ["transport", "交通", Train]].map(([key, label, Icon]) => <button key={key} onClick={() => setTab(key)} className={`py-1 ${tab === key ? "text-sky-700" : "text-slate-500"}`}><Icon className="w-5 h-5 mx-auto mb-1" />{label}</button>)}</nav>
  </div>;
}
