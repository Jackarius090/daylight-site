import { dataTypeDay } from "../../components/ShowData";
import { add } from "date-fns/fp";
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
  moonrise: string;
  moonset: string;
}

function convertDateToCorrectAPIFormat(date: Date) {
  return date.toISOString().slice(0, 10);
}

async function fetchData(url: string) {
  const res = await fetch(url, { cache: "force-cache" });

  if (!res.ok) {
    console.log(res);
    throw new Error(`Astronomy API failed: ${res.status}`);
  }

  return await res.json();
}

export async function GET(request: NextRequest) {
  const cityQuery = request.nextUrl.searchParams.get("city");
  const timeUnitQuery = request.nextUrl.searchParams.get("timeunit");
  let data = null;

  console.log("fetching data...");
  try {
    // instead of manking many api calls to gather data for 1 day every week for a year.
    // This will gather time series data for 73 days at a time (the api limit is 90 days at one time and 365 devides nicely into 73 x 5), and then parse out the days needed.

    const urls = [];
    let currentDate = new Date();
    for (let i = 0; i < 5; i++) {
      const datePlusInterval = add({ days: 73 }, currentDate);
      const currentDateISO = convertDateToCorrectAPIFormat(currentDate);
      const dateInNinetyDaysISO =
        convertDateToCorrectAPIFormat(datePlusInterval);
      urls.push(
        fetchData(
          `https://api.ipgeolocation.io/v2/astronomy/timeSeries?apiKey=${process.env.DAY_LENGTH_API_KEY}&dateStart=${currentDateISO}&dateEnd=${dateInNinetyDaysISO}&location=${cityQuery}&elevation=10`,
        ),
      );
      currentDate = add({ days: 73 }, currentDate);
    }
    data = await Promise.all(urls);
    console.log(data[0].astronomy);
    console.log("data fetched");

    // this takes the array of arrays that is received from the api call. It takes only the astronomy data and then flattens in the arrays into a single array.
    data = {
      astronomy: data
        .map((threeMonthPeriod) => {
          return threeMonthPeriod.astronomy;
        })
        .flat(1),
    };

    if (timeUnitQuery === "week") {
      data.astronomy = data.astronomy.filter((day, i) => {
        if ((i + 1) % 7 === 0) {
          return day;
        }
      });
    } else if (timeUnitQuery === "month") {
      data.astronomy = data.astronomy.filter((day, i) => {
        if ((i + 1) % 30 === 0) {
          return day;
        }
      });
    }
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return Response.json({ error: "Failed to fetch data" }, { status: 500 });
  }

  const reformattedData: dataTypeDay[] = data.astronomy.map(
    (day: ApiDayResponse) => {
      return {
        date: day.date,
        day_length: convertHoursMinutesToMinutes(day.day_length),
        sunriseMinutes: convertHoursMinutesToMinutes(day.sunrise),
        sunsetMinutes: convertHoursMinutesToMinutes(day.sunset),
        sunriseTime: day.sunrise,
        sunsetTime: day.sunset,
        moonRiseTime: convertHoursMinutesToMinutes(day.moonrise),
        moonSetTime: convertHoursMinutesToMinutes(day.moonset),
      };
    },
  );
  return Response.json(reformattedData);
}
