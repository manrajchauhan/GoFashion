import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/app/lib/mongodb";
import ImageLibrary from "@/app/models/Library";
import cloudinary from "cloudinary";

// Cloudinary configuration
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function DELETE(request: NextRequest, context: any) {
  try {
    const { params } = context;
    const id = params?.id;

    if (!id) {
      return NextResponse.json({ error: "Image ID is required" }, { status: 400 });
    }

    await connectToDB();
    const image = await ImageLibrary.findById(id);
    if (!image) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    const publicId = getPublicIdFromUrl(image.imageUrl);
    if (!publicId) {
      return NextResponse.json({ error: "Image does not have a valid public_id" }, { status: 400 });
    }

    const cloudinaryResponse = await cloudinary.v2.uploader.destroy(publicId);
    if (cloudinaryResponse.result === "not found") {
      return NextResponse.json({ error: "Image not found in Cloudinary" }, { status: 404 });
    }

    await ImageLibrary.findByIdAndDelete(id);

    return NextResponse.json(
      { message: "Image deleted successfully from Cloudinary and the database" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting image:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// Helper function to extract public ID from Cloudinary URL
const getPublicIdFromUrl = (url: string): string => {
  const regex = /\/v\d+\/(.+?)\.[a-z]+$/;
  const matches = url.match(regex);
  return matches ? matches[1] : "";
};
