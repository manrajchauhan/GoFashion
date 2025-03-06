"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";

interface FormData {
  category: string;
  subcategory: string;
  color: string;
  fabric: string;
  occasion: string;
  sleeveType: string;
  neckline: string;
  fitStyle: string;
  pattern: string;
  imageName: string;
  imageDescription: string;
  file: FileList | null;
}

const categories = ["Casual Wear", "Formal Wear", "Party Wear", "Ethnic Wear", "Wedding & Bridal Wear", "Fusion Wear"];
const subcategories = {
  Men: ["Shirts", "Suits", "Kurtas", "Sherwanis", "Jackets", "Blazers", "Jeans", "Trousers"],
  Women: ["Dresses", "Tops", "Sarees", "Lehengas", "Kurtis", "Gowns", "Co-ord Sets", "Jumpsuits", "Jeans", "Skirts", "Anarkali", "Sharara", "Plazo"],
};

const colors = ["Black", "White", "Red", "Blue", "Green", "Yellow", "Pink", "Beige", "Gray", "Purple", "Brown", "Orange", "Multicolor"];
const fabrics = ["Cotton", "Linen", "Silk", "Denim", "Velvet", "Chiffon", "Polyester", "Rayon", "Wool", "Satin", "Leather"];
const occasions = ["Casual Outing", "Office Wear", "Party", "Wedding", "Festival", "Sports"];
const sleeveTypes = ["Sleeveless", "Short Sleeve", "Half Sleeve", "Full Sleeve", "Off-Shoulder", "Cold Shoulder"];
const necklines = ["Round Neck", "V-Neck", "Boat Neck", "Collar", "Halter Neck", "Square Neck", "Deep Neck"];
const fitStyles = ["Slim Fit", "Regular Fit", "Loose Fit", "Bodycon", "Flared", "Oversized", "Tailored"];
const patterns = ["Solid", "Striped", "Floral", "Checked", "Abstract", "Polka Dots", "Animal Print", "Geometric"];

export default function AddImagePage() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Only image files (JPG, PNG, Webp, Avif) are allowed.");
        return;
      }

      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div className="px-4 py-4">
      <div className="max-w-full mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-xl font-semibold text-center">Upload Image</h2>
        <p className="text-gray-500 text-center mb-6">Fill out the details for the image upload.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Side - Form Inputs */}
          <div className="space-y-5">
            {/* File Upload */}
            <div className="border-dashed border-2 p-4 rounded-lg text-center">
              <label className="cursor-pointer text-blue-500">
                Drag & Drop or <span className="font-semibold">Choose file</span> to upload
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/avif,image/webp"
                  className="hidden"
                  {...register("file")}
                  onChange={handleFileChange}
                />
              </label>
              {selectedFile && <p className="text-gray-600 mt-2">{selectedFile.name}</p>}
            </div>

            {/* Image Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Image Name</label>
              <input
                type="text"
                {...register("imageName", { required: true })}
                className="w-full p-2 border rounded-lg"
                placeholder="Enter Image Name"
              />
              {errors.imageName && <p className="text-red-500 text-xs">Image name is required.</p>}
            </div>

            {/* Image Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Image Description</label>
              <textarea
                {...register("imageDescription", { required: true, maxLength: 250 })}
                className="w-full p-2 border rounded-lg"
                rows={3}
                placeholder="Describe the image..."
              />
              {errors.imageDescription && <p className="text-red-500 text-xs">Description is required (Max: 250 chars).</p>}
            </div>

            {/* Dropdown Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select {...register("category", { required: true })} className="w-full p-2 border rounded-lg">
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Subcategory</label>
                <select {...register("subcategory", { required: true })} className="w-full p-2 border rounded-lg">
                  {subcategories.Women.map((sub) => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* More Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Occasion</label>
                <select {...register("occasion")} className="w-full p-2 border rounded-lg">
                  {occasions.map((occ) => (
                    <option key={occ} value={occ}>{occ}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Sleeve Type</label>
                <select {...register("sleeveType")} className="w-full p-2 border rounded-lg">
                  {sleeveTypes.map((sleeve) => (
                    <option key={sleeve} value={sleeve}>{sleeve}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* More Dropdowns */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Neckline</label>
                <select {...register("neckline")} className="w-full p-2 border rounded-lg">
                  {necklines.map((neck) => (
                    <option key={neck} value={neck}>{neck}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Pattern & Print</label>
                <select {...register("pattern")} className="w-full p-2 border rounded-lg">
                  {patterns.map((pat) => (
                    <option key={pat} value={pat}>{pat}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
              Save
            </button>
          </div>
          {/* Right Side - Image Preview */}
          <div className="flex justify-center items-center border p-4 rounded-lg">
            {previewUrl ? (
              <img src={previewUrl} alt="Preview" className="max-w-full h-auto rounded-lg shadow-lg" />
            ) : (
              <p className="text-gray-400">No image selected</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
