import { useEffect, useState } from "react";

const weatherDescription = code => {
  if (code === 0) return "晴朗";
  if ([1, 2].includes(code)) return "多云";
  if (code === 3) return "阴天";
  if ([45, 48].includes(code)) return "有雾";
  if ([51, 53, 55, 56, 57].includes(code)) return "毛毛雨";
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return "有雨";
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "有雪";
  if ([95, 96, 99].includes(code)) return "雷雨";
  return "天气状况未知";
};

export default function useWeather(location, enabled) {
  const [weather, setWeather] = useState({ loading: false, error: false, data: null });

  useEffect(() => {
    if (!enabled || !location) {
      setWeather({ loading: false, error: false, data: null });
      return undefined;
    }

    const controller = new AbortController();
    setWeather({ loading: true, error: false, data: null });
    const params = new URLSearchParams({
      latitude: String(location.latitude),
      longitude: String(location.longitude),
      current: "temperature_2m,apparent_temperature,precipitation,wind_speed_10m,weather_code",
      daily: "temperature_2m_max,temperature_2m_min,precipitation_probability_max",
      forecast_days: "1",
      timezone: "auto",
    });

    fetch(`https://api.open-meteo.com/v1/forecast?${params}`, { signal: controller.signal })
      .then(response => {
        if (!response.ok) throw new Error("Weather request failed");
        return response.json();
      })
      .then(result => {
        const current = result.current;
        const daily = result.daily;
        if (!current || !daily) throw new Error("Weather response incomplete");
        setWeather({
          loading: false,
          error: false,
          data: {
            description: weatherDescription(current.weather_code),
            temperature: current.temperature_2m,
            feelsLike: current.apparent_temperature,
            high: daily.temperature_2m_max?.[0],
            low: daily.temperature_2m_min?.[0],
            precipitation: daily.precipitation_probability_max?.[0] ?? current.precipitation,
            windSpeed: current.wind_speed_10m,
          },
        });
      })
      .catch(error => {
        if (error.name !== "AbortError") setWeather({ loading: false, error: true, data: null });
      });

    return () => controller.abort();
  }, [enabled, location?.latitude, location?.longitude]);

  return weather;
}
