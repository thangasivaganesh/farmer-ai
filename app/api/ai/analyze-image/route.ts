import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { analyzeCropDiseaseImage } from "@/lib/ai/geminiService";

const AnalyzeImageSchema = z.object({
  imageBase64: z.string().min(10, "Image data required"),
  mimeType: z.enum(["image/jpeg", "image/png", "image/webp"]).default("image/jpeg"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = AnalyzeImageSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Invalid image format. Supported formats: JPG, PNG, WEBP (Max 5MB).",
        },
        { status: 400 }
      );
    }

    const { imageBase64, mimeType } = parsed.data;

    // Reject excessively large base64 payloads (> 10MB string length)
    if (imageBase64.length > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Image file too large. Please upload an image under 5MB." },
        { status: 413 }
      );
    }

    const analysis = await analyzeCropDiseaseImage(imageBase64, mimeType);
    return NextResponse.json(analysis, { status: 200 });
  } catch (error: any) {
    console.error("Analyze Image API Error:", error);
    return NextResponse.json(
      {
        error: "Unable to complete AI plant pathology analysis. Please ensure the image is clear and try again.",
      },
      { status: 500 }
    );
  }
}
