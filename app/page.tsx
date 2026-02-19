"use server";
import DataWrapper from "../components/DataWrapper";

export default async function Home() {
  return (
    <main className="w-screen h-screen bg-background">
      <header className="flex justify-center">
        <h1 className="text-2xl pt-4">daylight length visualisation</h1>
      </header>
      <div className="flex justify-center items-center size-full">
        <div className="w-5/6 h-10/12 rounded-md bg-chart-3">
          <DataWrapper />
        </div>
      </div>
    </main>
  );
}
