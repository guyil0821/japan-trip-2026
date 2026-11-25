import { useEffect, useState } from "react";

// The outbound departure is shown in Shanghai local time (UTC+8).
const START = new Date("2026-12-16T14:00:00+08:00");
// Return flight arrival, shown in Shanghai local time.
const END = new Date("2026-12-23T12:20:00+08:00");

function getCountdown(now) {
  if (now < START) {
    const remaining = START.getTime() - now.getTime();
    return { status: "before", days: Math.floor(remaining / 86400000), hours: Math.floor((remaining % 86400000) / 3600000), minutes: Math.floor((remaining % 3600000) / 60000), seconds: Math.floor((remaining % 60000) / 1000) };
  }
  if (now < END) return { status: "during", days: 0, hours: 0, minutes: 0, seconds: 0 };
  return { status: "after", days: 0, hours: 0, minutes: 0, seconds: 0 };
}

export default function useCountdown() {
  const [countdown, setCountdown] = useState(() => getCountdown(new Date()));

  useEffect(() => {
    const interval = setInterval(() => setCountdown(getCountdown(new Date())), 1000);
    return () => clearInterval(interval);
  }, []);

  return countdown;
}
