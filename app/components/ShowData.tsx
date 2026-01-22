"use client";
import { dataTypeDay } from "../page";

export default function ShowData({ data }: { data: dataTypeDay }) {
  return (
    <div>
      <div>{data.sunrise}</div>
      <div>{data.sunset}</div>
      <div
        className="bg-blue-700 w-20 p-2"
        style={{ height: `${data.dayLength}px` }}
      >
        Day length: {data.dayLength} minutes
      </div>
    </div>
  );
}
