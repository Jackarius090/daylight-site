import { Switch } from "./ui/switch";
import { Label } from "@/components/ui/label";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Info } from "lucide-react";
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
        }}
        id="moon-data-switch"
        defaultChecked
      />
      <Label htmlFor="moon-data-switch" className="text-primary-foreground">
        Show moon data
      </Label>
      <HoverCard openDelay={0}>
        <HoverCardTrigger asChild>
          <Info className="text-primary-foreground" size={20} />
        </HoverCardTrigger>
        <HoverCardContent className=" bg-muted-foreground" side="right">
          Days that appear to be missing moon data show a new moon that is not
          easily visible in the sky.
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}
