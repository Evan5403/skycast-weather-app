// app/services/weatherService.ts
export type Unit = 'metric' | 'imperial';

export type CurrentWeather = {
  temp: number;
  description: string;
  icon: string;
  city: string;
  country: string;
  wind: number;
  windDeg: number;
  humidity: number;
};

export type ForecastDay = {
  date: string; // ISO string
  icon: string;
  tempMin: number;
  tempMax: number;
  description: string;
};

export type WeatherResponse = {
  current: CurrentWeather;
  forecast: ForecastDay[];
};

const API_BASE = "http://localhost:8000/api"; // Laravel API base

export async function getWeather(city: string, unit: Unit): Promise<WeatherResponse> {
  const res = await fetch(`${API_BASE}/weather?city=${city}&units=${unit}`);
  if (!res.ok) {
    throw new Error("Failed to fetch weather data");
  }

  const json = await res.json();

  // Transform `current`
  const current: CurrentWeather = {
    temp: json.current.main.temp,
    description: json.current.weather[0]?.description ?? '',
    icon: json.current.weather[0]?.icon ?? '',
    city: json.city ?? json.current.name,
    country: json.current.sys.country,
    wind: json.current.wind.speed,
    windDeg: json.current.wind.deg,
    humidity: json.current.main.humidity,
  };

  // Transform `forecast`
  const forecast: ForecastDay[] = [];

  Object.entries(json.forecast).slice(0, 3).forEach(([date, entries]) => {
    const dayEntries = entries as any[];

    const temps = dayEntries.map((e) => e.main.temp);
    const icons = dayEntries.map((e) => e.weather[0].icon);
    const descriptions = dayEntries.map((e) => e.weather[0].description);

    const dayMin = Math.min(...temps);
    const dayMax = Math.max(...temps);

    forecast.push({
      date: date,
      icon: icons[0],
      tempMin: dayMin,
      tempMax: dayMax,
      description: descriptions[0],
    });
  });

  return { current, forecast };
}
