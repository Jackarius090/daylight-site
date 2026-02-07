"use client";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import DataGraph from "./DataGraph";
import TimeUnitToggle from "./TimeUnitToggle";

export interface dataTypeDay {
  day_length: string;
  sunrise: string;
  sunset: string;
}

export type DataTypeMonth = dataTypeDay[];

export default function ShowData() {
  const [city, setCity] = useState("copenhagen");
  const [timeUnit, setTimeUnit] = useState("week");

  const { data, refetch } = useQuery({
    queryKey: ["timeUnit", timeUnit],
    queryFn: async () => {
      const response = await fetch(`/api?city=${city}&timeunit=${timeUnit}`, {
        cache: "force-cache",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  const days: DataTypeMonth = Array.isArray(data) ? data : [];
  return (
    <div className="m-10">
      <DataGraph days={days} />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          refetch();
        }}
      >
        <span>Choose country:</span>
        <Input
          onChange={(e) => setCity(e.target.value)}
          value={city}
          className="border-black w-48 m-4"
        />
      </form>
      <TimeUnitToggle setTimeUnit={setTimeUnit} />
    </div>
  );
}
