import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { askFarmerAI } from "@/lib/ai/geminiService";

const ChatRequestSchema = z.object({
  query: z.string().min(1, "Query cannot be empty").max(1000, "Query too long"),
  context: z
    .object({
      farmerName: z.string().optional(),
      district: z.string().optional(),
      village: z.string().optional(),
      crops: z.array(z.string()).optional(),
      landSizeAcres: z.number().optional(),
      irrigationType: z.string().optional(),
      preferredLang: z.enum(["ta", "en"]).optional(),
    })
    .optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = ChatRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Invalid request payload",
          details: parsed.error.format(),
        },
        { status: 400 }
      );
    }

    const { query, context } = parsed.data;
    const response = await askFarmerAI(query, context);

    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    console.error("AI Chat API Error:", error);
    return NextResponse.json(
      {
        message: "Farmer AI is temporarily unavailable. Please try again.",
        language: "en",
        toolsCalled: [],
        sources: [],
      },
      { status: 500 }
    );
  }
}
