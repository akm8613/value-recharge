import { NextResponse } from "next/server";
import log from "@/lib/logger";

export async function GET() {
  // We will trigger all three levels of logs to see how they look!
  log.info("Test Run: This is a standard INFO log. Everything is working perfectly.");
  log.warn("Test Run: This is a WARN log. Something might need your attention.");
  log.error("Test Run: This is an ERROR log. Something broke!");

  return NextResponse.json({ 
    success: true, 
    message: "Logs generated successfully! Check your VS Code terminal and your 'logs' folder." 
  });
}