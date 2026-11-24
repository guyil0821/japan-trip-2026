export const money = n => new Intl.NumberFormat("zh-CN", { maximumFractionDigits: 2 }).format(Number(n) || 0);
export const cny = n => `¥${money(n)}`;
export const entryCny = e => e.currency === "JPY" ? Number(e.amount || 0) * Number(e.rate || 0) : Number(e.amount || 0);
