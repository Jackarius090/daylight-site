"use client";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import DataGraph from "./DataGraph";
import TimeUnitToggle from "./TimeUnitToggle";
import ChangeInDayLength from "./ChangeInDayLength";
import { DateRange } from "./DateRange";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import MoonDataSwitch from "./MoonDataSwitch";

export interface dataTypeDay {
  date: string;
  day_length: number;
  sunriseMinutes: number;
  sunsetMinutes: number;
  sunriseTime: string;
  sunsetTime: string;
  moonRiseTime: string;
  moonSetTime: string;
}

export type DataTypeDayArray = dataTypeDay[];

export default function ShowData() {
  const [city, setCity] = useState("copenhagen");
  const [timeUnit, setTimeUnit] = useState("day");
  const [dateRange, setDateRange] = useState([365]);
  const [recentlySearchedPlaces, setRecentlySearchedPlaces] = useState([
    "copenhagen",
  ]);

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

  const days: DataTypeDayArray = Array.isArray(data) ? data : [];

  function handleRecentlySearchedPlaces() {
    setRecentlySearchedPlaces((prev) => {
      const updated = [city, ...prev.filter((p) => p !== city)];
      return updated.slice(0, 3);
    });
  }

  function getComputedDateRange() {
    // the date range value comes as days. So this function changes that value to show the correct amount of months or weeks.
    if (timeUnit === "day") return dateRange;
    if (timeUnit === "week") return [Math.floor(dateRange[0] / 7)];
    if (timeUnit === "month") return [Math.floor(dateRange[0] / 30)];
    return dateRange;
  }
  const computedDateRange = getComputedDateRange();

  return (
    <div className="m-2 md:m-10">
      <DataGraph days={days} computedDateRange={computedDateRange} />
      <form
        onSubmit={(e) => {
          ``;
          e.preventDefault();
          refetch();
          handleRecentlySearchedPlaces();
        }}
        className="lg:columns-2 space-y-5 mt-4 p-4 border rounded-md"
      >
        <ChangeInDayLength days={days} city={city} timeUnit={timeUnit} />
        <div className="flex gap-4">
          <Label htmlFor="chooseCity" className="text-primary-foreground">
            Choose place: (eg. country/city)
          </Label>
          <Input
            id="chooseCity"
            onChange={(e) => setCity(e.target.value)}
            value={city}
            className="border-primary-foreground text-primary-foreground rounded-md w-48 h-9"
          />
        </div>
        <button type="submit" className="hidden" aria-hidden="true" />
        <div className="flex">
          <div className="flex gap-4 items-center">
            <Label htmlFor="recentPlaces" className="text-primary-foreground">
              Recent places:
            </Label>
            <div id="recentPlaces" className="flex gap-4">
              {recentlySearchedPlaces.map((place, i) => {
                if (place) {
                  return (
                    <Button
                      className="h-7"
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
        </div>
        <DateRange setDateRange={setDateRange} />
        <TimeUnitToggle setTimeUnit={setTimeUnit} />
        <MoonDataSwitch />
      </form>
    </div>
  );
}
