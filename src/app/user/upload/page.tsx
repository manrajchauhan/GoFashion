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
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    if (!selectedFile) {
      setMessage("Please select an image file to upload.");
      return;
    }

    const token = localStorage.getItem("authToken");
    if (!token) {
      setMessage("User is not authenticated. Please login.");
      return;
    }

    setUploading(true);
    setMessage(null);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await fetch("/api/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const result = await response.json();
      console.log("Upload Response:", result);


      if (response.ok) {
        setMessage("Image uploaded successfully!");
        setPreviewUrl(null);
        setSelectedFile(null);
      } else {
        setMessage(result.error || "Failed to upload image.");
      }
    } catch (error) {
      console.error("Upload Error:", error);
      setMessage("Something went wrong. Try again.");
    }

    setUploading(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      if (!file.type.startsWith("image/")) {
        alert("Only image files (JPG, PNG, WebP, Avif) are allowed.");
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
              <label className="cursor-pointer text-[#EA580B]">
                Drag & Drop or <span className="font-semibold">Choose file</span> to upload
                <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
              </label>
              {selectedFile && <p className="text-gray-600 mt-2">{selectedFile.name}</p>}
            </div>

            {/* Image Name & Description */}
            <input type="text" {...register("imageName", { required: true })} className="w-full p-2 border rounded-lg" placeholder="Image Name" />
            <textarea {...register("imageDescription", { required: true })} className="w-full p-2 border rounded-lg" placeholder="Image Description" />

            {/* Dropdown Fields (Two Columns) */}
<div className="grid grid-cols-2 gap-4">
  {[
    { label: "Category", options: categories, name: "category" },
    { label: "Subcategory", options: subcategories.Women, name: "subcategory" },
    { label: "Color", options: colors, name: "color" },
    { label: "Fabric", options: fabrics, name: "fabric" },
    { label: "Occasion", options: occasions, name: "occasion" },
    { label: "Sleeve Type", options: sleeveTypes, name: "sleeveType" },
    { label: "Neckline", options: necklines, name: "neckline" },
    { label: "Fit Style", options: fitStyles, name: "fitStyle" },
    { label: "Pattern", options: patterns, name: "pattern" },
  ].map(({ label, options, name }) => (
    <div key={name} className="w-full">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <select {...register(name as keyof FormData)} className="w-full p-2 border rounded-lg">
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  ))}
</div>


            {/* Submit Button */}
            <button type="submit" className="w-full bg-[#EA580B] py-2 rounded-lg text-white " disabled={uploading}>
              {uploading ? "Uploading..." : "Save"}
            </button>
            {message && <p className="text-center text-sm mt-2 text-red-500">{message}</p>}
          </div>

          {/* Image Preview */}
          <div className="flex justify-center items-center border p-4 rounded-lg">
            {previewUrl ? <img src={previewUrl} alt="Preview" className="max-w-full h-auto rounded-lg shadow-lg" /> : <p className="text-gray-400">No image selected</p>}
          </div>
        </form>
      </div>
    </div>
  );
}
