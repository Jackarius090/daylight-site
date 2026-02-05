import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Dispatch, SetStateAction } from "react";
import { QueryObserverResult } from "@tanstack/react-query";

export default function TimeUnitToggle({
  refetch,
  setTimeUnit,
}: {
  refetch: Promise<QueryObserverResult<any, Error>>;
  setTimeUnit: Dispatch<SetStateAction<string>>;
}) {
  function toggleTimeUnit(newValue: string) {
    setTimeUnit(newValue);
    refetch();
  }
  return (
    <ToggleGroup
      onValueChange={(newValue) => toggleTimeUnit(newValue)}
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
