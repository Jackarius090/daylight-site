export async function GET(request: Request) {
  console.log("request.url:", request.url);

  try {
    const response = await fetch(
      `https://api.ipgeolocation.io/v2/astronomy/timeSeries?apiKey=${process.env.DAY_LENGTH_API_KEY}&dateStart=2026-01-01&dateEnd=2026-01-31&location=copenhagen&elevation=10`,
    );
    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return null;
  }
}
