import { dataTypeDay } from "../page";

import { type NextRequest } from "next/server";

function convertHoursMinutesToMinutes(dayLengthInClockFormat: string) {
  // converts time in format: "HH:MM" to number of minutes.
  const hours = dayLengthInClockFormat.slice(0, 2);
  const convertedMinutes = Number(hours) * 60;
  const minutes = dayLengthInClockFormat.slice(-2);
  const totalMinutes = convertedMinutes + Number(minutes);
  return totalMinutes;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const cityQuery = searchParams.get("city");
  const timeUnitQuery = searchParams.get("timeunit");
  console.log("timeUnitQuery:", timeUnitQuery);

  let data = null;
  const url = `https://api.ipgeolocation.io/v2/astronomy/timeSeries?apiKey=${process.env.DAY_LENGTH_API_KEY}&dateStart=2026-01-01&dateEnd=2026-01-31&location=${cityQuery}&elevation=10`;

  try {
    const response = await fetch(url);
    data = await response.json();
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return Response.json({ error: "Failed to fetch data" }, { status: 500 });
  }

  data = data.astronomy.map((day: dataTypeDay) => {
    return {
      day_length: convertHoursMinutesToMinutes(day.day_length),
      sunrise: day.sunrise,
      sunset: day.sunset,
    };
  });
  return Response.json(data);
}
