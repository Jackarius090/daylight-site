import { Switch } from "./ui/switch";
import { Label } from "@/components/ui/label";
import { Dispatch, SetStateAction } from "react";

export default function MoonDataSwitch({
  setShowMoonData,
}: {
  setShowMoonData: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className="flex items-center gap-4">
      <Switch
        onCheckedChange={(value) => {
          setShowMoonData(value);
          console.log(value);
        }}
        id="moon-data-switch"
      />
      <Label htmlFor="moon-data-switch" className="text-primary-foreground">
        Show moon data
      </Label>
    </div>
  );
}
