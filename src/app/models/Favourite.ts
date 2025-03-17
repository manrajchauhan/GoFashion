import mongoose from "mongoose";

const FavouriteSchema = new mongoose.Schema(
  {
    client_id: {type: String, required: true},
    imageName: { type: String, required: true},
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
  },
  { timestamps: true }
);

const Favourite = mongoose.models.Favourite || mongoose.model("Favourite", FavouriteSchema);
export default Favourite;
