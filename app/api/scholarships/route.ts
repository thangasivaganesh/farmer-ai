import { NextRequest, NextResponse } from "next/server";
import { getScholarships } from "@/lib/scholarships/scholarshipService";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const level = searchParams.get("level") || "all";
    const scholarships = await getScholarships(level);
    return NextResponse.json(scholarships, { status: 200 });
  } catch (error: any) {
    console.error("Scholarships API Error:", error);
    return NextResponse.json({ error: "Failed to retrieve scholarships." }, { status: 500 });
  }
}
