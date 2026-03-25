import { Slider } from "@/components/ui/slider";
import { DataTypeMonth } from "./ShowData";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Label } from "./ui/label";

export function DateRange({
  days,
  setDateRange,
  dateRange,
  timeUnit,
}: {
  days: DataTypeMonth;
  setDateRange: Dispatch<SetStateAction<number[]>>;
  dateRange: number[];
  timeUnit: string;
}) {
  const [sliderValue, setSliderValue] = useState([365]);

  function setValue(value: number[]) {
    setSliderValue(value);
    if (timeUnit === "day") {
      setDateRange(value);
    } else if (timeUnit === "week") {
      const newDateRangeValue = [Math.floor(value[0] / 7)];
      setDateRange(newDateRangeValue);
    } else if (timeUnit === "month") {
      const newDateRangeValue = [Math.floor(value[0] / 30)];
      setDateRange(newDateRangeValue);
    }
  }

  return (
    <div className="flex gap-3 my-4">
      <Label className="text-primary-foreground">Choose date range</Label>
      <Slider
        max={365}
        step={1}
        className="max-w-xs "
        value={sliderValue}
        onValueChange={(value) => setValue(value)}
      />
      <div className="text-primary-foreground">
        From today until: {sliderValue} days in the future
      </div>
    </div>
  );
}
