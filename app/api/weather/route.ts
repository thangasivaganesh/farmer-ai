import { NextRequest, NextResponse } from "next/server";
import { fetchDistrictWeather } from "@/lib/weather/openMeteo";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const district = searchParams.get("district") || "Thanjavur";
    const latParam = searchParams.get("lat");
    const lonParam = searchParams.get("lon");

    const customLat = latParam ? parseFloat(latParam) : undefined;
    const customLon = lonParam ? parseFloat(lonParam) : undefined;

    const weatherData = await fetchDistrictWeather(district, customLat, customLon);
    return NextResponse.json(weatherData, { status: 200 });
  } catch (error: any) {
    console.error("Weather API Error:", error);
    return NextResponse.json(
      { error: "Weather data is temporarily unavailable. Please try again." },
      { status: 500 }
    );
  }
}
