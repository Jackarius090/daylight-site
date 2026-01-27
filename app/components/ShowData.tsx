"use client";
import { dataTypeDay, DataTypeMonth } from "../page";
import { useQuery } from "@tanstack/react-query";

export default function ShowData() {
  const response = useQuery({
    queryKey: ["data"],
    queryFn: async () => {
      const response = await fetch("/api/");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  const days: DataTypeMonth = Array.isArray(response.data) ? response.data : [];

  return (
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
  );
}
