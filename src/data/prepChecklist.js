export const prepChecklist = [
  { id: "communication", title: "通讯", items: [
    { id: "roaming", text: "是否已开通国际漫游" },
    { id: "sim-esim", text: "是否已准备日本 SIM / eSIM" },
    { id: "local-network", text: "确认手机支持日本当地网络" },
  ] },
  { id: "entry", title: "入境", items: [
    { id: "visit-japan-web", text: "填写 Visit Japan Web" },
    { id: "visit-japan-qr", text: "保存 Visit Japan Web QR Code" },
    { id: "passport-validity", text: "检查护照有效期" },
  ] },
  { id: "insurance", title: "保险", items: [
    { id: "travel-insurance", text: "是否已购买旅行保险" },
    { id: "insurance-policy", text: "保存电子保单" },
    { id: "insurance-phone", text: "保存保险紧急联系电话" },
  ] },
  { id: "payments", title: "支付", items: [
    { id: "overseas-card", text: "准备至少一张境外可用 Visa / Mastercard" },
    { id: "apple-pay-suica", text: "Apple Pay / Suica 准备" },
    { id: "yen-cash", text: "准备少量日元现金" },
  ] },
  { id: "transport", title: "交通", items: [
    { id: "shinkansen", text: "确认新干线安排" },
    { id: "city-transport", text: "确认青森、函馆、横滨、东京交通" },
    { id: "google-maps", text: "保存重要 Google Maps 路线" },
  ] },
  { id: "accommodation", title: "住宿", items: [
    { id: "hotel-orders", text: "确认全部酒店订单" },
    { id: "hotel-addresses", text: "保存酒店地址" },
    { id: "hotel-reservations", text: "保存酒店 reservation number" },
  ] },
  { id: "other", title: "其他", items: [
    { id: "plug-charger", text: "日本插头和充电器检查" },
    { id: "power-bank", text: "移动电源" },
    { id: "medicine", text: "常用药" },
    { id: "passport-backup", text: "护照电子备份" },
    { id: "flight-screenshot", text: "航班信息截图" },
  ] },
];
