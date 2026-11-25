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
  const [year, month, day] = START_DATE.split("-").map(Number);
  const start = new Date(year, month - 1, day);
  const today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const countdownDays = Math.max(0, Math.round((start.getTime() - today.getTime()) / 86400000));

  if (localDate < START_DATE) return { status: "before", itineraryDate: null, countdownDays };
  if (localDate > END_DATE) return { status: "after", itineraryDate: null, countdownDays: 0 };
  const [, itineraryMonth, itineraryDay] = localDate.split("-");
  return { status: "during", itineraryDate: `${itineraryMonth}/${itineraryDay}`, countdownDays: 0 };
}

export function daysUntilTrip(date = new Date()) {
  return getTripStatus(date).countdownDays;
}
