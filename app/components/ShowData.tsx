"use client";
import { useState } from "react";
import { dataTypeDay } from "../page";
// import { DataTypeMonth } from "../page";
import { useQuery } from "@tanstack/react-query";

export default function ShowData() {
  const [data, setData] = useState(null);

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
  console.log(response);

  return (
    <div className="flex flex-row">
      {response &&
        response.map((day: dataTypeDay, i) => {
          return (
            <div key={i}>
              <div>{day.day_length}</div>
              <div>{day.sunrise}</div>
              <div>{day.sunset}</div>
              <div
                className="bg-blue-700 w-20 p-2"
                style={{ height: `${day.day_length}px` }}
              >
                Day length: {day.day_length} minutes
              </div>
            </div>
          );
        })}
    </div>
  );
}
