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

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: "Image ID is required" }, { status: 400 });
    }

    // Connect to DB
    await connectToDB();

    // Find the image by id
    const image = await ImageLibrary.findById(id);
    if (!image) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    // Log the image for debugging
    console.log("Image found:", image);

    // Extract the public_id from the image URL
    const publicId = getPublicIdFromUrl(image.imageUrl);
    if (!publicId) {
      return NextResponse.json({ error: "Image does not have a valid public_id" }, { status: 400 });
    }

    // Log the public_id for debugging
    console.log("Extracted Cloudinary Public ID:", publicId);

    // Attempt to delete the image from Cloudinary
    const cloudinaryResponse = await cloudinary.v2.uploader.destroy(publicId, {
      type: 'upload',
      resource_type: 'image',
    });

    console.log("Cloudinary response:", cloudinaryResponse);

    if (cloudinaryResponse.result === 'not found') {
      console.error(`Cloudinary could not find image with public_id: ${publicId}`);
      return NextResponse.json({ error: "Image not found in Cloudinary" }, { status: 404 });
    }

    // Delete the image from MongoDB
    await ImageLibrary.findByIdAndDelete(id);

    return NextResponse.json({ message: "Image deleted successfully from Cloudinary and the database" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting image:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// Utility function to extract the public_id from the image URL and remove file extension
const getPublicIdFromUrl = (url: string): string => {
  const regex = /upload\/([^/]+)\/([^?]+)/; // Adjusted regex
  const matches = url.match(regex);
  if (matches && matches.length > 2) {
    let publicId = matches[2]; // Extract the public_id
    // Remove file extension (.jpg, .jpeg, .png, etc.)
    publicId = publicId.replace(/\.[^/.]+$/, "");
    return publicId;
  }
  console.error("Public ID not found in URL:", url);
  return ''; // Return an empty string if no match is found
};
