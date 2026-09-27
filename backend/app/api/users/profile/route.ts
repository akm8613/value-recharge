import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";
import { verifyAuth } from "@/lib/helpers/auth";

export async function GET(req: Request) {
  try {
    // 1. Run the request through our Auth Helper
    const authResult = verifyAuth(req);
    
    // 2. If verification fails, return the error immediately
    if (authResult.error) {
      return NextResponse.json(
        { error: authResult.error },
        { status: authResult.status }
      );
    }

    // 3. If successful, connect to the database
    await connectDB();

    // 4. Find the user using the ID stored inside the decoded JWT
    // The authResult.user is typed as 'any' by default, so we cast it
    const userId = (authResult.user as any).userId;
    const user = await User.findById(userId).select("-password"); // Exclude the password!

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // 5. Return the protected user data
    return NextResponse.json({ user }, { status: 200 });

  } catch (error) {
    console.error("Profile error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
// Keep your existing GET function up here...
import { updateUserProfile } from "@/lib/controllers/user.controller";

export async function PUT(req: Request) {
  return await updateUserProfile(req);
}