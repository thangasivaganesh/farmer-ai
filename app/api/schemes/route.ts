import { NextRequest, NextResponse } from "next/server";
import { getSchemes } from "@/lib/schemes/schemeService";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query") || undefined;
    const schemes = await getSchemes(query);
    return NextResponse.json(schemes, { status: 200 });
  } catch (error: any) {
    console.error("Schemes API Error:", error);
    return NextResponse.json({ error: "Failed to retrieve government schemes." }, { status: 500 });
  }
}
