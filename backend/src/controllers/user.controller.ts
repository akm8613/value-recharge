import { NextResponse } from "next/server";
import { verifyAuth } from "@/lib/helpers/auth";
import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";

export const updateUserProfile = async (req: Request) => {
  try {
    // 1. Verify the user's token
    const authResult = verifyAuth(req);
    if (authResult.error) return NextResponse.json({ error: authResult.error }, { status: authResult.status });

    // 2. Connect to the database and parse the new data
    await connectDB();
    const body = await req.json();
    const { name, phone } = body;

    // 3. Find the user by ID and update their info
    // The { new: true } tells MongoDB to return the updated document, not the old one
    const updatedUser = await User.findByIdAndUpdate(
      (authResult.user as any).userId,
      { name, phone },
      { new: true } 
    ).select("-password");

    if (!updatedUser) return NextResponse.json({ error: "User not found" }, { status: 404 });

    return NextResponse.json({ message: "Profile updated successfully", user: updatedUser }, { status: 200 });
  } catch (error) {
    console.error("Update profile error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
};