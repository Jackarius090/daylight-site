"use server";
import ShowData from "./components/ShowData";
import { parse, differenceInMinutes } from "date-fns";

export interface dataType {
  dayLength: number;
  sunrise: string;
  sunset: string;
}

export default async function Home() {
  async function getData() {
    const url =
      "https://api.sunrise-sunset.org/json?lat=36.7201600&lng=-4.4203400&date=2026-01-18";
    try {
      const response = await fetch(url, { cache: "force-cache" });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to fetch data:", error);
      return null;
    }
  }

  const response = await getData();

  const start = parse(response.results.sunrise, "h:mm:ss a", new Date());
  const end = parse(response.results.sunset, "h:mm:ss a", new Date());

  const diffMinutes = differenceInMinutes(end, start);

  const data: dataType = {
    dayLength: diffMinutes,
    sunrise: response.results.sunrise,
    sunset: response.results.sunset,
  };

  console.log(data);
  console.log("diff in mins:", diffMinutes);

  return (
    <main className="w-screen h-screen">
      <header className="flex justify-center">
        <h1 className="text-2xl">daylight length visualisation</h1>
      </header>
      <div className="flex justify-center items-center size-full">
        <div className="size-5/6 bg-amber-600">
          <ShowData data={data} />
        </div>
      </div>
    </main>
  );
}
