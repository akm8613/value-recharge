import jwt from "jsonwebtoken";

export function verifyAuth(req: Request) {
  // 1. Extract the Authorization header
  const authHeader = req.headers.get("authorization");
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return { error: "Unauthorized: Missing or invalid token", status: 401 };
  }

  // 2. Isolate the actual token string
  const token = authHeader.split(" ")[1];

  try {
    // 3. Verify the token using your secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return { user: decoded };
  } catch (error) {
    return { error: "Unauthorized: Token is invalid or expired", status: 401 };
  }
}