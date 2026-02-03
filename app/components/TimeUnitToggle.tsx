import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default function TimeUnitToggle() {
  return (
    <ToggleGroup variant="outline" type="single" defaultValue="day">
      <ToggleGroupItem value="day" aria-label="Toggle day">
        Day
      </ToggleGroupItem>
      <ToggleGroupItem value="week" aria-label="Toggle week">
        Week
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
