import { NextRequest, NextResponse } from "next/server";
import { INITIAL_REMINDERS } from "@/lib/notifications/notificationService";

export async function GET() {
  return NextResponse.json(INITIAL_REMINDERS, { status: 200 });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newReminder = {
      id: `rem-${Date.now()}`,
      title: body.title || "Farm Reminder",
      category: body.category || "TASK",
      targetDate: body.targetDate || new Date().toISOString().split("T")[0],
      isCompleted: false,
      notes: body.notes || "",
      createdAt: new Date().toISOString(),
    };
    return NextResponse.json(newReminder, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to create reminder" }, { status: 500 });
  }
}
