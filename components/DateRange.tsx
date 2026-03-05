import { Slider } from "@/components/ui/slider";
import { DataTypeMonth } from "./ShowData";
import { Dispatch, SetStateAction } from "react";

export function DateRange({
  days,
  setDateRange,
  dateRange,
}: {
  days: DataTypeMonth;
  setDateRange: Dispatch<SetStateAction<number[]>>;
  dateRange: number[];
}) {
  return (
    <div>
      <div>{dateRange}</div>
      <Slider
        max={100}
        step={1}
        className="mx-auto w-full max-w-xs"
        value={dateRange}
        onValueChange={setDateRange}
      />
    </div>
  );
}
