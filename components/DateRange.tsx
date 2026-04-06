import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { Label } from "./ui/label";

export function DateRange({
  setDateRange,
}: {
  setDateRange: (value: number[]) => void;
}) {
  const [sliderValue, setSliderValue] = useState([365]);

  return (
    <div className="flex gap-3 my-4">
      <Label className="text-primary-foreground">Choose date range</Label>
      <Slider
        max={365}
        step={1}
        className="max-w-xs "
        value={sliderValue}
        onValueChange={(value) => {
          setSliderValue(value);
          setDateRange(value);
        }}
      />
      <div className="text-primary-foreground text-sm font-medium">
        From today until: {sliderValue} days in the future
      </div>
    </div>
  );
}
