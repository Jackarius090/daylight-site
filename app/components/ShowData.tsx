"use client";
import { dataTypeDay } from "../page";
import { DataTypeMonth } from "../page";

export default function ShowData({ data }: { data: DataTypeMonth }) {
  return (
    <div className="flex flex-row">
      {data.map((day: dataTypeDay, i) => {
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
