const START_DATE = "2026-12-16";
const END_DATE = "2026-12-23";

function formatLocalDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getTripStatus(date = new Date()) {
  const localDate = formatLocalDate(date);
  if (localDate < START_DATE) return { status: "before", itineraryDate: null };
  if (localDate > END_DATE) return { status: "after", itineraryDate: null };
  const [, month, day] = localDate.split("-");
  return { status: "during", itineraryDate: `${month}/${day}` };
}

export function daysUntilTrip(date = new Date()) {
  const [year, month, day] = START_DATE.split("-").map(Number);
  const start = Date.UTC(year, month - 1, day);
  const today = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  return Math.max(0, Math.ceil((start - today) / 86400000));
}
