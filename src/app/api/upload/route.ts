import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/app/lib/mongodb";
import ImageLibrary from "@/app/models/Library";
import User from "@/app/models/User";
import cloudinary from "cloudinary";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }


    const reader = file.stream().getReader();
    const chunks: Uint8Array[] = [];
    let done = false;

    while (!done) {
      const { value, done: readerDone } = await reader.read();
      if (value) chunks.push(value);
      done = readerDone;
    }

    const buffer = Buffer.concat(chunks);
    const base64String = `data:${file.type};base64,${buffer.toString("base64")}`;


    const uploadResponse = await cloudinary.v2.uploader.upload(base64String, {
      folder: "gofashion",
    });

    if (!uploadResponse || !uploadResponse.secure_url) {
      return NextResponse.json({ error: "Cloudinary upload failed" }, { status: 500 });
    }


    const imageName = formData.get("imageName") as string;
    const imageDescription = formData.get("imageDescription") as string;
    const category = formData.get("category") as string;
    const subcategory = formData.get("subcategory") as string;
    const color = formData.get("color") as string;
    const fabric = formData.get("fabric") as string;
    const occasion = formData.get("occasion") as string;
    const sleeveType = formData.get("sleeveType") as string;
    const neckline = formData.get("neckline") as string;
    const fitStyle = formData.get("fitStyle") as string;
    const pattern = formData.get("pattern") as string;


    if (!imageName || !imageDescription || !category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!user.client_id || !mongoose.Types.ObjectId.isValid(user.client_id)) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    const newImage = new ImageLibrary({
      imageName,
      imageDescription,
      imageUrl: uploadResponse.secure_url,
      category,
      subcategory,
      color,
      fabric,
      occasion,
      sleeveType,
      neckline,
      fitStyle,
      pattern,
      uploadedBy: new mongoose.Types.ObjectId(user.client_id),
    });

    await newImage.save();

    return NextResponse.json({ message: "Image uploaded successfully", image: newImage }, { status: 201 });

  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
