import { NextResponse } from "next/server";
import log from "@/lib/logger"; // <-- 1. Import your Winston logger

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount, carrier, planId, phone, gateway } = body;

    if (!amount || amount <= 0) {
      log.warn(`Invalid amount attempt for phone: ${phone}`); // <-- 2. Log warnings
      return NextResponse.json({ error: "Valid amount is required" }, { status: 400 });
    }

    // 3. MOCK PAYMENT GATEWAY BEHAVIOR
    await new Promise(resolve => setTimeout(resolve, 800)); 

    // <-- 3. Log normal info! This gets written to the .log file
    log.info(`Simulating $${amount} Payment Intent for Guest: ${phone} via ${gateway}`);

    return NextResponse.json({
      clientSecret: "pi_mock_secret_9876543210_test_signature",
      message: "Mock payment intent created successfully."
    }, { status: 200 });

  } catch (error: any) {
    // <-- 4. Log errors directly to your file for debugging later
    log.error(`Payment Intent Error: ${error.message || error}`);
    
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}