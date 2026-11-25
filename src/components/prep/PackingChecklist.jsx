import React from "react";
import ChecklistSection from "./ChecklistSection";

const packingGroups = [
  { id: "documents", title: "证件", items: ["护照", "银行卡", "日元现金", "旅行保险"] },
  { id: "clothing", title: "衣物", items: ["羽绒服 / 保暖外套", "保暖内层", "毛衣", "长裤", "保暖内衣", "厚袜", "睡衣", "内衣", "手套", "围巾", "帽子"] },
  { id: "snow-outdoor", title: "雪地 / 户外", items: ["防水鞋", "防滑装备", "暖宝宝", "防水外层"] },
  { id: "electronics", title: "电子产品", items: ["手机", "充电器", "充电线", "移动电源", "AirPods", "相机（如需）"] },
  { id: "running", title: "跑步", items: ["跑鞋", "跑步服", "跑步袜", "运动手表"] },
  { id: "care", title: "洗护", items: ["牙刷", "护肤品", "润唇膏", "常用药"] },
  { id: "shopping", title: "购物准备", items: ["可折叠购物袋", "行李额确认", "预留购物空间"] },
].map(group => ({ ...group, items: group.items.map((text, index) => ({ id: `${group.id}-${index}`, text })) }));

export default function PackingChecklist({ checked, onToggle }) {
  const total = packingGroups.reduce((sum, group) => sum + group.items.length, 0);
  const completed = packingGroups.reduce((sum, group) => sum + group.items.filter(item => checked[item.id]).length, 0);
  return <div className="space-y-3"><ProgressCardForPacking completed={completed} total={total} />{packingGroups.map(section => <ChecklistSection key={section.id} section={section} checked={checked} onToggle={onToggle} />)}</div>;
}

function ProgressCardForPacking({ completed, total }) {
  const percent = Math.round((completed / total) * 100);
  return <section className="rounded-2xl border bg-white p-4"><div className="flex items-center justify-between"><h2 className="font-semibold">行李准备完成度</h2><span className="text-sm text-slate-500">{completed} / {total} · {percent}%</span></div><div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-sky-600 transition-all" style={{ width: `${percent}%` }} /></div></section>;
}
