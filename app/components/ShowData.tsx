"use client";
import { dataTypeDay, DataTypeMonth } from "../page";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export default function ShowData() {
  const [city, setCity] = useState("copenhagen");

  const { data, refetch } = useQuery({
    queryKey: ["data"],
    queryFn: async () => {
      const response = await fetch(`/api?city=${city}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  const days: DataTypeMonth = Array.isArray(data) ? data : [];

  return (
    <div>
      <div className="flex flex-row">
        {days &&
          days.map((day: dataTypeDay, i: number) => {
            return (
              <div key={i}>
                <div
                  className="bg-blue-700 w-7 p-2"
                  style={{ height: `${day.day_length}px` }}
                >
                  {day.day_length}
                </div>
              </div>
            );
          })}
      </div>
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
    </div>
  );
}
