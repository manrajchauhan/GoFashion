"use client";
import React from "react";

interface FilterProps {
  onFilterChange: (filterType: string, value: string) => void;
}

export default function Filter({ onFilterChange }: FilterProps) {
  return (
    <div>
      <h2 className="text-2xl tracking-tighter font-semibold mb-4">Filters</h2>

      {/* Category Filter */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Category</label>
        <select className="w-full px-4 py-2 border rounded-lg" onChange={(e) => onFilterChange("category", e.target.value)}>
          <option value="">All Categories</option>
          <option value="Casual Wear">Casual Wear</option>
          <option value="Formal Wear">Formal Wear</option>
          <option value="Party Wear">Party Wear</option>
          <option value="Ethnic Wear">Ethnic Wear</option>
          <option value="Wedding & Bridal Wear">Wedding & Bridal Wear</option>
          <option value="Fusion Wear">Fusion Wear</option>
        </select>
      </div>

      {/* Color Filter */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Color</label>
        <select className="w-full px-4 py-2 border rounded-lg" onChange={(e) => onFilterChange("color", e.target.value)}>
          <option value="">All Colors</option>
          <option value="Black">Black</option>
          <option value="White">White</option>
          <option value="Red">Red</option>
          <option value="Blue">Blue</option>
          <option value="Green">Green</option>
          <option value="Yellow">Yellow</option>
          <option value="Pink">Pink</option>
          <option value="Beige">Beige</option>
          <option value="Gray">Gray</option>
          <option value="Purple">Purple</option>
          <option value="Brown">Brown</option>
          <option value="Orange">Orange</option>
          <option value="Multicolor">Multicolor</option>
        </select>
      </div>

      {/* Fabric Type Filter */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Fabric Type</label>
        <select className="w-full px-4 py-2 border rounded-lg" onChange={(e) => onFilterChange("fabric", e.target.value)}>
          <option value="">All Fabrics</option>
          <option value="Cotton">Cotton</option>
          <option value="Linen">Linen</option>
          <option value="Silk">Silk</option>
          <option value="Denim">Denim</option>
          <option value="Velvet">Velvet</option>
          <option value="Chiffon">Chiffon</option>
          <option value="Polyester">Polyester</option>
          <option value="Rayon">Rayon</option>
          <option value="Wool">Wool</option>
          <option value="Satin">Satin</option>
          <option value="Leather">Leather</option>
        </select>
      </div>

      {/* Sleeve Type Filter */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Sleeve Type</label>
        <select className="w-full px-4 py-2 border rounded-lg" onChange={(e) => onFilterChange("sleeveType", e.target.value)}>
          <option value="">All Sleeve Types</option>
          <option value="Sleeveless">Sleeveless</option>
          <option value="Short Sleeve">Short Sleeve</option>
          <option value="Half Sleeve">Half Sleeve</option>
          <option value="Full Sleeve">Full Sleeve</option>
          <option value="Off-Shoulder">Off-Shoulder</option>
          <option value="Cold Shoulder">Cold Shoulder</option>
        </select>
      </div>

      {/* Occasion Filter */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Occasion</label>
        <select className="w-full px-4 py-2 border rounded-lg" onChange={(e) => onFilterChange("occasion", e.target.value)}>
          <option value="">All Occasions</option>
          <option value="Casual Outing">Casual Outing</option>
          <option value="Office Wear">Office Wear</option>
          <option value="Party">Party</option>
          <option value="Wedding">Wedding</option>
          <option value="Festival">Festival</option>
          <option value="Sports">Sports</option>
        </select>
      </div>

      {/* Fit & Style Filter */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Fit & Style</label>
        <select className="w-full px-4 py-2 border rounded-lg" onChange={(e) => onFilterChange("fitStyle", e.target.value)}>
          <option value="">All Fit Styles</option>
          <option value="Slim Fit">Slim Fit</option>
          <option value="Regular Fit">Regular Fit</option>
          <option value="Loose Fit">Loose Fit</option>
          <option value="Bodycon">Bodycon</option>
          <option value="Flared">Flared</option>
          <option value="Oversized">Oversized</option>
          <option value="Tailored">Tailored</option>
        </select>
      </div>

      {/* Pattern Filter */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Pattern</label>
        <select className="w-full px-4 py-2 border rounded-lg" onChange={(e) => onFilterChange("pattern", e.target.value)}>
          <option value="">All Patterns</option>
          <option value="Solid">Solid</option>
          <option value="Floral">Floral</option>
          <option value="Printed">Printed</option>
          <option value="Striped">Striped</option>
          <option value="Checked">Checked</option>
          <option value="Polka Dot">Polka Dot</option>
          <option value="Embroidered">Embroidered</option>
          <option value="Patterned">Patterned</option>
        </select>
      </div>

      {/* Reset Filters Button */}
      <button className="w-full px-4 py-2 bg-black text-white rounded-lg hover:bg-red-600 transition duration-200" onClick={() => onFilterChange("reset", "")}>
        Reset Filters
      </button>
    </div>
  );
}
