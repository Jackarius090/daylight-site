"use client";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import DataGraph from "./DataGraph";
import TimeUnitToggle from "./TimeUnitToggle";
import ChangeInDayLength from "./ChangeInDayLength";
import { DateRange } from "./DateRange";
import { Button } from "./ui/button";

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
  const [timeUnit, setTimeUnit] = useState("day");
  const [dateRange, setDateRange] = useState([365]);
  const [recentlySearchedPlaces, setRecentlySearchedPlaces] = useState([""]);

  const { data, refetch } = useQuery({
    queryKey: ["daylightTime", timeUnit],
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

  function handleRecentlySearchedPlaces() {
    setRecentlySearchedPlaces((prev) => {
      const updated = [city, ...prev.filter((p) => p !== city)];
      return updated.slice(0, 3);
    });
  }

  function getComputedDateRange() {
    if (timeUnit === "day") return dateRange;
    if (timeUnit === "week") return [Math.floor(dateRange[0] / 7)];
    if (timeUnit === "month") return [Math.floor(dateRange[0] / 30)];
    return dateRange;
  }

  const computedDateRange = getComputedDateRange();

  console.log(dateRange);

  return (
    <div className="m-2 md:m-10">
      <DataGraph days={days} computedDateRange={computedDateRange} />
      <div className="columns-2 gap-4 mt-4 p-4 border rounded-md">
        <ChangeInDayLength days={days} city={city} timeUnit={timeUnit} />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            refetch();
            handleRecentlySearchedPlaces();
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
          <button type="submit" className="hidden" aria-hidden="true" />
          <div className="flex">
            <div className="flex gap-4 items-center">
              <div className="text-primary-foreground">Recent places:</div>
              {recentlySearchedPlaces.map((place, i) => {
                if (place) {
                  return (
                    <Button
                      variant="outline"
                      onClick={() => {
                        setCity(place);
                        refetch();
                      }}
                      key={i}
                    >
                      {place}
                    </Button>
                  );
                }
              })}
            </div>
          </div>
          <DateRange setDateRange={setDateRange} />
        </form>
        <TimeUnitToggle setTimeUnit={setTimeUnit} />
      </div>
    </div>
  );
}
