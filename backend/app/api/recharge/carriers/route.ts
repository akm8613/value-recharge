import { NextResponse } from "next/server";

// Mock database of standard US carriers and their current prepay plans
const carrierDatabase = [
  {
    id: "verizon",
    name: "Verizon",
    logo: "https://upload.wikimedia.org/wikipedia/commons/8/81/Verizon_2015_logo_-vector.svg",
    plans: [
      { id: "vz_15", name: "$15 Prepaid Data", amount: 15 },
      { id: "vz_35", name: "$35 Talk, Text & 15GB", amount: 35 },
      { id: "vz_50", name: "$50 Unlimited Plus", amount: 50 },
    ]
  },
  {
    id: "att",
    name: "AT&T",
    logo: "https://upload.wikimedia.org/wikipedia/commons/3/31/AT%26T_logo_2016.svg",
    plans: [
      { id: "att_10", name: "$10 Refill", amount: 10 },
      { id: "att_30", name: "$30 Prepaid 5GB", amount: 30 },
      { id: "att_65", name: "$65 Unlimited Max", amount: 65 },
    ]
  },
  {
    id: "tmobile",
    name: "T-Mobile",
    logo: "https://upload.wikimedia.org/wikipedia/commons/e/e4/T-Mobile_logo.svg",
    plans: [
      { id: "tm_15", name: "$15 Connect 3GB", amount: 15 },
      { id: "tm_40", name: "$40 Simply Prepaid 10GB", amount: 40 },
      { id: "tm_50", name: "$50 Unlimited", amount: 50 },
    ]
  }
];

export async function GET(req: Request) {
  try {
    // 1. AUTH CHECK REMOVED! Anyone can now fetch these plans.

    // 2. Simulate the network delay of a real Carrier API
    await new Promise(resolve => setTimeout(resolve, 600));

    // 3. Return the data
    return NextResponse.json(
      { 
        message: "Carriers fetched successfully",
        carriers: carrierDatabase 
      }, 
      { status: 200 }
    );

  } catch (error) {
    console.error("Carriers fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}