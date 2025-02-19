import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectToDB } from "@/app/lib/mongodb";
import User from "@/app/models/User";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    const { name, surname, email, password, mobile } = await req.json();

    if (!name || !surname || !email || !password || !mobile) {
      return NextResponse.json({ message: "All fields are required!" }, { status: 400 });
    }


    await connectToDB();


    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists!" }, { status: 409 });
    }


    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      surname,
      email,
      password: hashedPassword,
      mobile,
    });


    await newUser.save();

    const secretKey = process.env.JWT_SECRET;

    if (!secretKey) {
      return NextResponse.json({ message: "JWT_SECRET is missing in the environment variables!" }, { status: 500 });
    }


    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      secretKey,
      { expiresIn: "1d" }
    );


    return NextResponse.json(
      { message: "User registered and logged in successfully!", token },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    const errorMessage = (error as any).message || "Unknown error";
    return NextResponse.json({ message: "Internal Server Error", error: errorMessage }, { status: 500 });
  }
}
