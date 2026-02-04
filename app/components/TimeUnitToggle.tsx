import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Dispatch, SetStateAction } from "react";

export default function TimeUnitToggle({
  setTimeUnit,
}: {
  setTimeUnit: Dispatch<SetStateAction<string>>;
}) {
  return (
    <ToggleGroup
      onValueChange={(newValue) => setTimeUnit(newValue)}
      variant="outline"
      type="single"
      defaultValue="day"
    >
      <ToggleGroupItem value="day" aria-label="Toggle day">
        Day
      </ToggleGroupItem>
      <ToggleGroupItem value="week" aria-label="Toggle week">
        Week
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
