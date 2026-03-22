import { Slider } from "@/components/ui/slider";
import { DataTypeMonth } from "./ShowData";
import { Dispatch, SetStateAction } from "react";
import { Label } from "./ui/label";

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
    <div className="flex gap-3 my-4">
      <Label className="text-primary-foreground">Choose date range</Label>
      <Slider
        max={365}
        step={1}
        className="max-w-xs "
        value={dateRange}
        onValueChange={setDateRange}
      />
      <div className="text-primary-foreground">
        From today until: {dateRange} days in the future
      </div>
    </div>
  );
}
