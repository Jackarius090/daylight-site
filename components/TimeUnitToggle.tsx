import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Dispatch, SetStateAction } from "react";

export default function TimeUnitToggle({
  setTimeUnit,
}: {
  setTimeUnit: Dispatch<SetStateAction<string>>;
}) {
  return (
    <RadioGroup
      onValueChange={(newValue) => setTimeUnit(newValue)}
      defaultValue="week"
    >
      <div className="flex items-center gap-3">
        <RadioGroupItem value="day" id="day" />
        <Label htmlFor="day">Day</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="week" id="week" />
        <Label htmlFor="week">Week</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="month" id="month" />
        <Label htmlFor="month">Month</Label>
      </div>
    </RadioGroup>
  );
}
