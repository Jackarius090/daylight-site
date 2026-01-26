"use client";
// import { useState } from "react";
import { dataTypeDay } from "../page";
// import { DataTypeMonth } from "../page";
import { useQuery } from "@tanstack/react-query";

export default function ShowData() {
  // const [data, setData] = useState(null);

  const response = useQuery({
    queryKey: ["data"],
    queryFn: async () => {
      const response = await fetch("/api/");
      console.log(response);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });
  console.log("data:", response.data);

  const days = Array.isArray(response.data) ? response.data : [];

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
