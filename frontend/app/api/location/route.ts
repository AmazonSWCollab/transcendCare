import { NextResponse } from "next/server";
import { TravelTimeClient } from "traveltime-api";
export async function POST(request: Request) {
  const body = await request.json();
  const { latitude, longitude } = body;
  const travelTimeClient = new TravelTimeClient({
    applicationId: `${process.env.TRAVELTIME_APPLICATION_ID}`,
    apiKey: `${process.env.TRAVELTIME_API_KEY}`,
  });

  const res = await travelTimeClient.geocodingReverse({
    lat: latitude,
    lng: longitude,
  });
  return NextResponse.json(res);
}
