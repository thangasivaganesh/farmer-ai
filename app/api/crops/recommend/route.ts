import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { recommendCrops } from "@/lib/crops/cropEngine";

const CropInputSchema = z.object({
  district: z.string().default("Thanjavur"),
  season: z.string().default("Samba"),
  soilType: z.string().default("Alluvial Clay Loam"),
  soilPh: z.number().optional(),
  waterAvailability: z.enum(["High", "Medium", "Low"]).default("High"),
  landSizeAcres: z.number().min(0.1).default(3.5),
  previousCrop: z.string().optional(),
  farmerPreference: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = CropInputSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid parameters", details: parsed.error.format() }, { status: 400 });
    }

    const recommendations = recommendCrops(parsed.data);
    return NextResponse.json(recommendations, { status: 200 });
  } catch (error: any) {
    console.error("Crop Recommendation API Error:", error);
    return NextResponse.json(
      { error: "Unable to calculate crop recommendations at this time." },
      { status: 500 }
    );
  }
}
