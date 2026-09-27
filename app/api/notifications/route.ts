import { NextRequest, NextResponse } from "next/server";
import { INITIAL_NOTIFICATIONS } from "@/lib/notifications/notificationService";

export async function GET() {
  return NextResponse.json(INITIAL_NOTIFICATIONS, { status: 200 });
}
