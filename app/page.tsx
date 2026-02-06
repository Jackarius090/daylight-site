"use server";
import DataWrapper from "./components/DataWrapper";

export default async function Home() {
  return (
    <main className="w-screen h-screen">
      <header className="flex justify-center">
        <h1 className="text-2xl">daylight length visualisation</h1>
      </header>
      <div className="flex justify-center items-center size-full">
        <div className="size-5/6 bg-amber-600">
          <DataWrapper />
        </div>
      </div>
    </main>
  );
}
