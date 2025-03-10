import mongoose from "mongoose";

const LibrarySchema = new mongoose.Schema(
  {
    imageName: { type: String, required: true, unique: true },
    imageDescription: { type: String, required: true },
    imageUrl: { type: String, required: true },
    category: { type: String, required: true },
    subcategory: { type: String, required: false },
    color: { type: String, required: true },
    fabric: { type: String, required: true },
    occasion: { type: String, required: true },
    sleeveType: { type: String, required: true },
    neckline: { type: String, required: true },
    fitStyle: { type: String, required: true },
    pattern: { type: String, required: true },

    uploadedBy: { type: String, required: true, ref: "User" },
  },
  { timestamps: true }
);

const ImageLibrary = mongoose.models.ImageLibrary || mongoose.model("ImageLibrary", LibrarySchema);
export default ImageLibrary;
