"use client";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import DataGraph from "./DataGraph";
import TimeUnitToggle from "./TimeUnitToggle";
import ChangeInDayLength from "./ChangeInDayLength";

export interface dataTypeDay {
  date: string;
  day_length: number;
  sunriseMinutes: number;
  sunsetMinutes: number;
  sunriseTime: string;
  sunsetTime: string;
}

export type DataTypeMonth = dataTypeDay[];

export default function ShowData() {
  const [city, setCity] = useState("copenhagen");
  const [timeUnit, setTimeUnit] = useState("month");

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
    <div className="m-2 md:m-10">
      <DataGraph days={days} />

      <ChangeInDayLength days={days} city={city} timeUnit={timeUnit} />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          refetch();
        }}
      >
        <span className="text-primary-foreground">
          Choose place: (eg. country/city)
        </span>
        <Input
          onChange={(e) => setCity(e.target.value)}
          value={city}
          className="border-primary-foreground text-primary-foreground rounded-md w-48 m-4"
        />
      </form>
      <TimeUnitToggle setTimeUnit={setTimeUnit} />
    </div>
  );
}
