import { NextRequest, NextResponse } from "next/server";
import { marketService } from "@/lib/markets/marketService";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const crop = searchParams.get("crop") || "Paddy (Ponni)";
    const district = searchParams.get("district") || "Thanjavur";
    const quantity = parseFloat(searchParams.get("quantity") || "10");

    const markets = await marketService.searchMarkets(crop, district, isNaN(quantity) ? 10 : quantity);
    return NextResponse.json(markets, { status: 200 });
  } catch (error: any) {
    console.error("Markets API Error:", error);
    return NextResponse.json(
      { error: "Market data is currently unavailable." },
      { status: 500 }
    );
  }
}
