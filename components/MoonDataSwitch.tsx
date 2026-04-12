import { Switch } from "./ui/switch";
import { Label } from "@/components/ui/label";

export default function MoonDataSwitch() {
  return (
    <div className="flex items-center gap-4">
      <Switch id="moon-data-switch" />
      <Label htmlFor="moon-data-switch" className="text-primary-foreground">
        Show moon data
      </Label>
    </div>
  );
}
