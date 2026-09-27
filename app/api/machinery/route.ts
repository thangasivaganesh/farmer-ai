import { NextRequest, NextResponse } from "next/server";
import { searchMachinery } from "@/lib/machinery/machineryService";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category") || "all";
    const district = searchParams.get("district") || "all";

    const machinery = await searchMachinery(category, district);
    return NextResponse.json(machinery, { status: 200 });
  } catch (error: any) {
    console.error("Machinery API Error:", error);
    return NextResponse.json(
      { error: "Farm machinery listings are currently unavailable." },
      { status: 500 }
    );
  }
}
