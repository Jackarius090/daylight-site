"use server";
import ShowData from "./components/ShowData";

export interface dataType {
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
  const data: dataType = {
    sunrise: response.results.sunrise,
    sunset: response.results.sunset,
  };

  console.log(data);

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
