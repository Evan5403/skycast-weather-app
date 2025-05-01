'use client';

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect } from "react";

type Props = {
  city: string;
  setCity: (city: string) => void;
  unit: 'metric' | 'imperial';
  setUnit: (unit: 'metric' | 'imperial') => void;
};

export function SearchBar({ city, setCity, unit, setUnit }: Props) {
  const [input, setInput] = useState(city);

  useEffect(() => {
    setInput(city);
  }, [city]);

  const handleSearch = () => {
    const trimmed = input.trim();
    if (trimmed && trimmed !== city) {
      setCity(trimmed);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
      <Input
        className="w-full md:w-2/3"
        placeholder="Enter city name..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        aria-label="City Search Input"
      />
      <Button onClick={handleSearch} aria-label="Search City">
        Search
      </Button>
      <div className="flex items-center gap-2 ml-auto">
        <span>°C</span>
        <Switch
          checked={unit === 'imperial'}
          onCheckedChange={(checked) => setUnit(checked ? 'imperial' : 'metric')}
          aria-label="Temperature Unit Switch"
        />
        <span>°F</span>
      </div>
    </div>
  );
}
