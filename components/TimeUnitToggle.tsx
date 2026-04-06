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
      className="text-primary-foreground flex gap-8"
      onValueChange={(newValue) => setTimeUnit(newValue)}
      defaultValue="day"
      id="timeunit"
    >
      <Label htmlFor="timeunit">Timeunit: </Label>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="day" id="day" />
        <Label htmlFor="day">Day</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="week" id="week" />
        <Label htmlFor="week">Week</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="month" id="month" />
        <Label htmlFor="month">Month</Label>
      </div>
    </RadioGroup>
  );
}
