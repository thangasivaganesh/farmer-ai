import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    {
      status: "healthy",
      service: "Farmer AI Platform API",
      version: "1.0.0",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || "production",
      services: {
        geminiAi: process.env.GEMINI_API_KEY ? "configured" : "advisory_mode",
        database: process.env.DATABASE_URL ? "configured" : "mock_mode",
        openMeteo: "live",
      },
    },
    { status: 200 }
  );
}
