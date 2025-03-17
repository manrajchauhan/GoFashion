import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/app/lib/mongodb";
import Favourite from "@/app/models/Favourite";
import User from "@/app/models/User";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const secretKey = process.env.JWT_SECRET;

export async function DELETE(req: NextRequest) {
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

    if (!user.client_id || !mongoose.Types.ObjectId.isValid(user.client_id)) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    const { imageUrl } = await req.json();

    if (!imageUrl) {
      return NextResponse.json({ error: "Image URL is required" }, { status: 400 });
    }

    const deletedFavourite = await Favourite.findOneAndDelete({
      client_id: user.client_id,
      imageUrl: imageUrl,
    });

    if (!deletedFavourite) {
      return NextResponse.json({ error: "Favourite not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Removed from favourites" }, { status: 200 });

  } catch (error) {
    console.error("Error deleting favourite:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
