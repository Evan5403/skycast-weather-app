'use client';

import { Card } from "@/components/ui/card";
import Image from "next/image";
import { format } from "date-fns";

type ForecastDay = {
  date: string;
  icon: string;
  tempMin: number;
  tempMax: number;
  description: string;
};

type Props = {
  forecast: ForecastDay[];
  unit: 'metric' | 'imperial';
};

export function ForecastCard({ forecast, unit }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
      {forecast.map((day, index) => (
        <Card
          key={index}
          className="flex flex-col items-center text-center p-4 rounded-2xl shadow-sm hover:shadow-md transition"
        >
          <div className="text-sm text-muted-foreground">
            {format(new Date(day.date), "EEE")}
          </div>
          <Image
            src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
            className="brightness-75"
            alt={day.description}
            width={64}
            height={64}
          />
          <div className="text-md font-semibold capitalize">{day.description}</div>
          <div className="text-sm mt-2 text-muted-foreground">
            {Math.round(day.tempMax)}° / {Math.round(day.tempMin)}° {unit === 'metric' ? 'C' : 'F'}
          </div>
        </Card>
      ))}
    </div>
  );
}
