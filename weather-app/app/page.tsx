'use client';

import { useEffect, useState } from "react";
import { SearchBar } from "./components/SearchBar";
import { ForecastCard } from "./components/ForecastCard";
import { getWeather, WeatherResponse, Unit } from "./services/weatherService";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";
import { Compass } from "lucide-react";
import { motion } from "framer-motion";

function getWindDirection(deg: number): string {
  const directions = [
    "N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE",
    "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW",
  ];
  const index = Math.round(deg / 22.5) % 16;
  return directions[index];
}

export default function HomePage() {
  const [city, setCity] = useState("Nairobi");
  const [unit, setUnit] = useState<Unit>("metric");
  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [rotation, setRotation] = useState(0);

  const fetchWeather = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getWeather(city, unit);
      setWeatherData(data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch weather data/Invalid city name");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [city, unit]);

  useEffect(() => {
    if (weatherData?.current.windDeg !== undefined) {
      setRotation(weatherData.current.windDeg);
    }
  }, [weatherData?.current.windDeg]);

  return (
    <motion.main
      initial={{ opacity: 0, y:10 }}
      animate={{ opacity: 1, y:0 }}
      transition={{ duration: 0.9 }}
      className="flex flex-col lg:flex-row min-h-screen"
    >
      {/* SIDEBAR */}
      <motion.aside 
        key={`sidebar-${city}-${unit}`}
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 3.5 }}
        className="w-full lg:w-1/3 bg-blue-50 p-6 flex flex-col justify-between"
      >
        {weatherData && (
          <>
            {/* Top: Weather Info */}
            <motion.div 
              className="flex flex-col items-center text-center space-y-4"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <img
                src={`https://openweathermap.org/img/wn/${weatherData.current.icon}@4x.png`}
                alt={weatherData.current.description}
                className="w-40 h-40 filter brightness-75"
              />
              <div className="text-5xl font-bold">
                {Math.round(weatherData.current.temp)}°
                {unit === "metric" ? "C" : "F"}
              </div>
              <p className="capitalize text-lg text-muted-foreground">
                {weatherData.current.description}
              </p>
            </motion.div>

            {/* Bottom: Date + City */}
            <motion.div 
              className="mt-8 text-center text-muted-foreground text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <p>
                {new Date().toLocaleDateString(undefined, {
                  weekday: "long",
                  day: "numeric",
                  month: "short",
                })}
              </p>
              <p className="font-medium">
                {weatherData.current.city}, {weatherData.current.country}
              </p>
            </motion.div>
          </>
        )}
      </motion.aside>

      {/* MAIN AREA */}
      <motion.section key={`${city}-${unit}`} className="flex-1 p-6">
        {/* SearchBar */}
        <SearchBar city={city} setCity={setCity} unit={unit} setUnit={setUnit} />

        {loading && <p className="text-center text-muted-foreground">Loading...</p>}

        {error && (
          <Alert variant="destructive" className="max-w-md mx-auto mt-4">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {!loading && weatherData && (
          <div className="space-y-6">
            {/* Forecast */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <h2 className="text-lg font-semibold mb-2">Next 3 Days</h2>
              <ForecastCard forecast={weatherData.forecast} unit={unit} />
            </motion.div>

            {/* Wind + Humidity */}
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}>
              {/* Wind */}
              <Card className="p-4 flex flex-col items-center justify-center text-center">
                <h3 className="font-semibold text-sm text-muted-foreground mb-2">Wind</h3>
                <div className="text-2xl font-bold">{weatherData.current.wind} {unit === 'imperial' ? 'mph' : 'm/s'}</div>
                <div className="mt-2 flex items-center gap-2">
                  <div
                    className="w-6 h-6 text-blue-600 transform transition-transform duration-500 ease-out"
                    style={{ transform: `rotate(${rotation}deg)` }}
                  >
                    <Compass className="w-full h-full" />
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {getWindDirection(weatherData.current.windDeg)}
                  </span>
                </div>
              </Card>

              {/* Humidity */}
              <Card className="p-4">
                <h3 className="font-semibold text-sm text-muted-foreground mb-2">Humidity</h3>
                <div className="text-2xl font-bold mb-2">{weatherData.current.humidity}%</div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-blue-500 h-2.5 rounded-full transition-all duration-700 ease-in-out"
                    style={{ width: `${weatherData.current.humidity}%` }}
                  />
                </div>
              </Card>
            </motion.div>
          </div>
        )}
      </motion.section>
    </motion.main>
  );
}
