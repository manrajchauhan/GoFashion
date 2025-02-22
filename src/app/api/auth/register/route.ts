import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectToDB } from "@/app/lib/mongodb";
import User from "@/app/models/User";


const validateInputs = (name: string, surname: string, email: string, password: string, mobile: string) => {
  if (!name || !surname || !email || !password || !mobile) {
    return "All fields are required!";
  }
  if (password.length < 6) {
    return "Password must be at least 6 characters long!";
  }
  return null;
};

export async function POST(req: NextRequest) {
  try {
    const { name, surname, email, password, mobile } = await req.json();

    // Validate input
    const validationError = validateInputs(name, surname, email, password, mobile);
    if (validationError) {
      return NextResponse.json({ message: validationError }, { status: 400 });
    }

    // Connect to the database
    await connectToDB();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists!" }, { status: 409 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save new user
    const newUser = await User.create({ name, surname, email, password: hashedPassword, mobile });

    // Ensure JWT Secret exists
    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
      return NextResponse.json({ message: "JWT_SECRET is missing in environment variables!" }, { status: 500 });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      secretKey,
      { expiresIn: "1d" }
    );

    return NextResponse.json(
      { message: "User registered successfully!", token, userId: newUser._id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error during user registration:", error);
    return NextResponse.json({ message: "Internal Server Error", error: (error as any).message }, { status: 500 });
  }
}
