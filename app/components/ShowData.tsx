"use client";
import { dataType } from "../page";

export default function ShowData({ data }: { data: dataType }) {
  return (
    <div>
      <div>{data.sunrise}</div>
      <div>{data.sunset}</div>
    </div>
  );
}
