import { useEffect, useState } from "react";

const EVENT_NAME = "local-storage-change";

export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try { const saved = localStorage.getItem(key); return saved ? JSON.parse(saved) : initialValue; }
    catch { return initialValue; }
  });

  useEffect(() => {
    try {
      const serialized = JSON.stringify(value);
      localStorage.setItem(key, serialized);
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: { key, value: serialized } }));
      }
    } catch {}
  }, [key, value]);

  useEffect(() => {
    const syncValue = event => {
      if (event.key !== key) return;
      const serialized = event.detail?.value ?? event.newValue;
      if (serialized == null) return;
      setValue(current => {
        try {
          return JSON.stringify(current) === serialized ? current : JSON.parse(serialized);
        } catch {
          return current;
        }
      });
    };
    if (typeof window === "undefined") return undefined;
    window.addEventListener(EVENT_NAME, syncValue);
    window.addEventListener("storage", syncValue);
    return () => {
      window.removeEventListener(EVENT_NAME, syncValue);
      window.removeEventListener("storage", syncValue);
    };
  }, [key]);

  return [value, setValue];
}
