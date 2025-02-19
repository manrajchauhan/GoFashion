import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "@/app/models/User";
import {connectToDB} from "@/app/lib/mongodb";

export async function POST(req: Request) {
  try {
    await connectToDB();
    const { email, password } = await req.json();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }


    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return NextResponse.json({ error: "JWT secret not configured" }, { status: 500 });
    }


    const token = jwt.sign(
      { id: user._id, email: user.email, name: user.name },
      jwtSecret,
      { expiresIn: "7d" }
    );


    return NextResponse.json(
      {
        message: "Login successful",
        token,
        user: { name: user.name, email: user.email },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
