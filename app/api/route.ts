import { dataTypeDay } from "../../components/ShowData";

import { type NextRequest } from "next/server";

function convertHoursMinutesToMinutes(dayLengthInClockFormat: string) {
  // converts time in format: "HH:MM" to number of minutes.
  const hours = dayLengthInClockFormat.slice(0, 2);
  const convertedMinutes = Number(hours) * 60;
  const minutes = dayLengthInClockFormat.slice(-2);
  const totalMinutes = convertedMinutes + Number(minutes);
  return totalMinutes;
}

interface ApiDayResponse {
  date: string;
  day_length: string;
  sunrise: string;
  sunset: string;
}

async function fetchData(url: string) {
  const res = await fetch(url, { cache: "force-cache" });

  if (!res.ok) {
    throw new Error(`Astronomy API failed: ${res.status}`);
  }

  return await res.json();
}

export async function GET(request: NextRequest) {
  const cityQuery = request.nextUrl.searchParams.get("city");
  const timeUnitQuery = request.nextUrl.searchParams.get("timeunit");
  let data = null;
  console.log("request:", request);

  console.log("fetching data...");
  try {
    if (timeUnitQuery === "day") {
      const url = `https://api.ipgeolocation.io/v2/astronomy/timeSeries?apiKey=${process.env.DAY_LENGTH_API_KEY}&dateStart=2026-01-01&dateEnd=2026-01-31&location=${cityQuery}&elevation=10`;
      data = await fetchData(url);
      console.log("data fetched");
    } else if (timeUnitQuery === "week") {
      const urls = [];
      let milliSeconds = Date.now();
      for (let i = 0; i < 52; i += 4) {
        const date = new Date(milliSeconds).toISOString();
        const formattedDate = date.slice(0, 10);
        urls.push(
          fetchData(
            `https://api.ipgeolocation.io/v2/astronomy/timeSeries?apiKey=${process.env.DAY_LENGTH_API_KEY}&dateStart=${formattedDate}&dateEnd=${formattedDate}&location=${cityQuery}&elevation=10`,
          ),
        );
        // add 1 week to milliseconds
        const millisecondsInADay = 1000 * 60 * 60 * 24;
        milliSeconds += millisecondsInADay * 7;
      }
      data = await Promise.all(urls);
      console.log("data fetched");
      data = {
        astronomy: data.map((day) => {
          return day.astronomy[0];
        }),
      };
    } else if (timeUnitQuery === "month") {
      const urls = [];
      let milliSeconds = Date.now();
      for (let i = 0; i < 12; i++) {
        const date = new Date(milliSeconds).toISOString();
        const formattedDate = date.slice(0, 10);
        urls.push(
          fetchData(
            `https://api.ipgeolocation.io/v2/astronomy/timeSeries?apiKey=${process.env.DAY_LENGTH_API_KEY}&dateStart=${formattedDate}&dateEnd=${formattedDate}&location=${cityQuery}&elevation=10`,
          ),
        );
        // add 1 month to milliseconds
        const millisecondsInADay = 1000 * 60 * 60 * 24;
        milliSeconds += millisecondsInADay * 30;
      }
      data = await Promise.all(urls);
      console.log("data fetched");
      data = {
        astronomy: data.map((day) => {
          return day.astronomy[0];
        }),
      };
    }
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return Response.json({ error: "Failed to fetch data" }, { status: 500 });
  }

  const reformattedData: dataTypeDay = data.astronomy.map(
    (day: ApiDayResponse) => {
      return {
        date: day.date,
        day_length: convertHoursMinutesToMinutes(day.day_length),
        sunriseMinutes: convertHoursMinutesToMinutes(day.sunrise),
        sunsetMinutes: convertHoursMinutesToMinutes(day.sunset),
        sunriseTime: day.sunrise,
        sunsetTime: day.sunset,
      };
    },
  );
  return Response.json(reformattedData);
}
