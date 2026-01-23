"use server";
import ShowData from "./components/ShowData";
import { parse, differenceInMinutes } from "date-fns";

export interface dataTypeDay {
  dayLength: number;
  sunrise: string;
  sunset: string;
}

export type DataTypeMonth = dataTypeDay[];

export default async function Home() {
  function getDatesInMonth(month: number) {
    const year = 2026;
    const dates = [];
    const date = new Date(year, month - 1, 1);
    while (date.getMonth() === month - 1) {
      dates.push(date.toISOString().slice(0, 10));
      date.setDate(date.getDate() + 1);
    }
    return dates;
  }

  // get January dates
  // const datesInJanuary = getDatesInMonth(1);
  // console.log(datesInJanuary);

  // make fetch requests:
  // const fetchRequestArray = datesInJanuary.map((date) => {
  //   return fetch(
  //     `https://api.sunrise-sunset.org/json?lat=36.7201600&lng=-4.4203400&date=2025-12-31`,
  //   );
  // });
  // console.log(fetchRequestArray);

  async function getData() {
    try {
      // const responses = await Promise.all(fetchRequestArray);
      // console.log(responses);
      // const data = await Promise.all(
      //   responses.map((response) => {
      //     return response.json();
      //   }),
      // );
      const response = await fetch(
        `https://api.ipgeolocation.io/v2/astronomy?apiKey=${process.env.DAY_LENGTH_API_KEY}&location=copenhagen&elevation=10`,
      );
      const data = await response.json();

      console.log(data);
      return data;
    } catch (error) {
      console.error("Failed to fetch data:", error);
      return null;
    }
  }

  const response = await getData();

  console.log(response);

  // const start = parse(response.results.sunrise, "h:mm:ss a", new Date());
  // const end = parse(response.results.sunset, "h:mm:ss a", new Date());

  // const diffMinutes = differenceInMinutes(end, start);

  // const data: dataTypeDay = {
  //   dayLength: diffMinutes,
  //   sunrise: response.results.sunrise,
  //   sunset: response.results.sunset,
  // };

  // console.log(data);
  // console.log("diff in mins:", diffMinutes);

  return (
    <main className="w-screen h-screen">
      <header className="flex justify-center">
        <h1 className="text-2xl">daylight length visualisation</h1>
      </header>
      <div className="flex justify-center items-center size-full">
        <div className="size-5/6 bg-amber-600">
          {/* <ShowData data={data} /> */}
        </div>
      </div>
    </main>
  );
}
