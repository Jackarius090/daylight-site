"use server";
import ShowData from "./components/ShowData";
import { parse, differenceInMinutes } from "date-fns";

export interface dataTypeDay {
  day_length: string;
  sunrise: string;
  sunset: string;
}

export type DataTypeMonth = dataTypeDay[];

export default async function Home() {
  async function getData() {
    try {
      const response = await fetch(
        `https://api.ipgeolocation.io/v2/astronomy/timeSeries?apiKey=${process.env.DAY_LENGTH_API_KEY}&dateStart=2026-01-01&dateEnd=2026-01-07&location=copenhagen&elevation=10`,
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to fetch data:", error);
      return null;
    }
  }

  const response = await getData();
  console.log(response);

  function convertHoursMinutesToMinutes(dayLengthInClockFormat: string) {
    // converts time in format: "HH:MM" to number of minutes.
    const hours = dayLengthInClockFormat.slice(0, 2);
    const convertedMinutes = Number(hours) * 60;
    const minutes = dayLengthInClockFormat.slice(-2);
    const totalMinutes = convertedMinutes + Number(minutes);
    return totalMinutes;
  }

  const data = response.astronomy.map((day: dataTypeDay) => {
    return {
      day_length: convertHoursMinutesToMinutes(day.day_length),
      sunrise: day.sunrise,
      sunset: day.sunset,
    };
  });

  console.log(data);

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
          <ShowData data={data} />
        </div>
      </div>
    </main>
  );
}
