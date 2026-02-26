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
      <HoverCardContent className="w-full flex flex-col gap-0.5 bg-muted-foreground">
        <h1>A visualisation of daylight length over time.</h1>
        <a
          className="p-2 mb-4 rounded-md hover:bg-background-highlight"
          href="https://github.com/Jackarius090/daylight-site"
        >
          https://github.com/Jackarius090/daylight-site
        </a>
        <div>Made using:</div>
        <ul className="list-disc pl-6 mb-2">
          <li>NextJS</li>
          <li>ChartJS</li>
          <li>ipgeolocation astronomy API</li>
          <li>Shadcn</li>
          <li>Tailwindcss</li>
          <li>date-fns</li>
        </ul>
      </HoverCardContent>
    </HoverCard>
  );
}
