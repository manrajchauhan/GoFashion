import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/app/lib/mongodb";
import Favourite from "@/app/models/Favourite";
import User from "@/app/models/User";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const secretKey = process.env.JWT_SECRET;

export async function POST(req: NextRequest) {
  try {
    await connectToDB();


    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token) {
      return NextResponse.json({ error: "Unauthorized: No token provided" }, { status: 401 });
    }

    let user;
    try {
      const decoded = jwt.verify(token, secretKey!) as { email: string };
      user = await User.findOne({ email: decoded.email });

      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
    } catch (error) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
    }


    const {
      imageUrl,
      imageName,
      imageDescription,
      category,
      subcategory,
      color,
      fabric,
      occasion,
      sleeveType,
      neckline,
      fitStyle,
      pattern,
    } = await req.json();


    if (!imageUrl || !imageName || !category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }


    if (!user.client_id || !mongoose.Types.ObjectId.isValid(user.client_id)) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }


    const existingFavourite = await Favourite.findOne({
      client_id: user.client_id,
      imageUrl: imageUrl,
    });

    if (existingFavourite) {
      return NextResponse.json(
        { message: "Image is already in favourites for this user" },
        { status: 409 }
      );
    }


    const newFavourite = new Favourite({
      client_id: user.client_id,
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
    });

    await newFavourite.save();

    return NextResponse.json({ message: "Image added to favourites successfully", favourite: newFavourite }, { status: 201 });

  } catch (error) {
    console.error("Favourite Upload Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
