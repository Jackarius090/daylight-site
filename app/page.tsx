"use server";
import DataWrapper from "../components/DataWrapper";
import { InfoHoverCard } from "@/components/InfoHoverCard";

export default async function Home() {
  return (
    <main className="w-screen h-screen bg-background">
      <header className="flex justify-center pt-4">
        <h1 className="text-2xl  text-neutral-700">
          daylight length visualisation
        </h1>
        <div className="flex items-center ml-25">
          <InfoHoverCard />
        </div>
      </header>
      <div className="flex justify-center items-center size-full">
        <div className="w-5/6 h-10/12 rounded-md bg-chart-3">
          <DataWrapper />
        </div>
      </div>
    </main>
  );
}
