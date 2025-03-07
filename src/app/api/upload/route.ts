import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import ImageLibrary from "@/app/models/Library";
import User from "@/app/models/User";
import { connectToDB } from "@/app/lib/mongodb";

const secretKey = process.env.JWT_SECRET;

export async function POST(req: NextRequest) {
  try {
    await connectToDB(); // Connect to MongoDB

    // Extract token from Authorization header
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    if (!secretKey) {
      return NextResponse.json({ error: "JWT secret key not configured" }, { status: 500 });
    }

    // Verify JWT token
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, secretKey) as { userId: string };
    } catch (error) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
    }

    // Parse request body
    const body = await req.json();
    const {
      imageName,
      imageDescription,
      imageUrl,
      category,
      subcategory,
      color,
      fabric,
      occasion,
      sleeveType,
      neckline,
      fitStyle,
      pattern,
    } = body;

    // Validate required fields
    if (
      !imageName ||
      !imageDescription ||
      !imageUrl ||
      !category ||
      !color ||
      !fabric ||
      !occasion ||
      !sleeveType ||
      !neckline ||
      !fitStyle ||
      !pattern
    ) {
      return NextResponse.json({ error: "All required fields must be provided." }, { status: 400 });
    }

    // Check if user exists
    const userExists = await User.findById(decodedToken.userId);
    if (!userExists) {
      return NextResponse.json({ error: "Unauthorized user" }, { status: 401 });
    }

    // Prevent duplicate image names
    const existingImage = await ImageLibrary.findOne({ imageName });
    if (existingImage) {
      return NextResponse.json({ error: "Image name already exists" }, { status: 409 });
    }

    // Save image details to database
    const newImage = new ImageLibrary({
      imageName,
      imageDescription,
      imageUrl,
      category,
      subcategory,
      color,
      fabric,
      occasion,
      sleeveType,
      neckline,
      fitStyle,
      pattern,
      uploadedBy: decodedToken.userId, // Extracted from token
    });

    await newImage.save();

    return NextResponse.json({ message: "Image uploaded successfully", image: newImage }, { status: 201 });
  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
