import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/app/models/User";
import { connectToDB } from "@/app/lib/mongodb";

const secretKey = process.env.JWT_SECRET;

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    if (!secretKey) {
      return NextResponse.json({ error: "JWT secret key not configured" }, { status: 500 });
    }

    // Verify JWT token
    const decodedToken = jwt.verify(token, secretKey) as { email: string };

    if (!decodedToken.email) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // Connect to MongoDB
    await connectToDB();

    // Fetch user from database
    const user = await User.findOne({ email: decodedToken.email }).select("-password"); // Exclude password

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        user: {
          name: user.name,
          surname: user.surname,
          email: user.email,
          mobile: user.mobile,
          client_id: user.client_id,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);

    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
    }

    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
