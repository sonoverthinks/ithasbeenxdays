import { NextResponse } from "next/server";
import { fetchAnalyzeAndStoreTweets } from "@/lib/fetch-analyze-store-tweets";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  await fetchAnalyzeAndStoreTweets();
  return NextResponse.json({ success: true });
}

export const dynamic = "force-dynamic";
