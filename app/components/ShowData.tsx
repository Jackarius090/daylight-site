"use client";
import { useEffect, useState } from "react";
import { dataTypeDay } from "../page";
import { DataTypeMonth } from "../page";

export default function ShowData() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    const getData = async () => {
      const response = await fetch("/api");
      const data = await response.json();
      console.log(data);
    };

    const data = getData();
    setData(data);
  }, []);

  return (
    <div className="flex flex-row">
      {data && data.map((day: dataTypeDay, i) => {
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
