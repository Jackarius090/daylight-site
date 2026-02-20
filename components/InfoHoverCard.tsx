import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Info } from "lucide-react";

export function InfoHoverCard() {
  return (
    <HoverCard openDelay={10} closeDelay={100}>
      <HoverCardTrigger asChild>
        <Info className="text-neutral-700" size={30} />
      </HoverCardTrigger>
      <HoverCardContent className="flex flex-col gap-0.5 bg-muted-foreground">
        <h1>A visualisation of daylight length over time. Using:</h1>
        <ul className="list-disc pl-6">
          <li>NextJS</li>
          <li>ChartJS</li>
          <li>ipgeolocation astronomy API</li>
        </ul>
        <a href="https://github.com/Jackarius090/daylight-site">
          <h1 className="text-">See GitHub repo here</h1>
        </a>
      </HoverCardContent>
    </HoverCard>
  );
}
