"use server";
import DataWrapper from "../components/DataWrapper";
import { InfoHoverCard } from "@/components/InfoHoverCard";

export default async function Home() {
  return (
    <main className="w-screen bg-background">
      <header className="flex justify-center py-6">
        <h1 className="text-2xl  text-neutral-700">
          daylight length visualisation
        </h1>
        <div className="flex items-center ml-25">
          <InfoHoverCard />
        </div>
      </header>
      <div className="flex justify-center items-center mx-1 md:mx-0">
        <div className="w-full md:w-10/12 rounded-md bg-chart-3">
          <DataWrapper />
        </div>
      </div>
    </main>
  );
}
