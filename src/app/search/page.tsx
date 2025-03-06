"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Link from "next/link";

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const dressSuggestions = [
    "Floral Dress",
    "Red Dress",
    "Silk Dress",
    "Summer Dress",
    "Casual Dress",
    "Party Gown",
    "Wedding Saree",
    "Maxi Dress",
    "Bohemian Beach Dress",
    "Satin Slip Dress",
  ];
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    if (searchTerm.length > 0) {
      const filtered = dressSuggestions.filter((dress) =>
        dress.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm]);

  const dresses = [
    { id: 1, name: "Floral Dress", img: "/dress/flora.webp", color: "Floral", trend: "Summer" },
    { id: 2, name: "Red Dress", img: "/dress/red-saree.webp", color: "Red", trend: "Trending" },
    { id: 3, name: "Red Dress", img: "/dress/red-saree.webp", color: "Red", trend: "Trending" },
    { id: 4, name: "Red Dress", img: "/dress/red-saree.webp", color: "Red", trend: "Trending" },
    { id: 5, name: "Red Dress", img: "/dress/red-saree.webp", color: "Red", trend: "Trending" },
    { id: 6, name: "Red Dress", img: "/dress/red-saree.webp", color: "Red", trend: "Trending" },
    { id: 7, name: "Red Dress", img: "/dress/red-saree.webp", color: "Red", trend: "Trending" },
    { id: 8, name: "Silk Dress", img: "/dress/cotton-silk-girl.jpeg", color: "Black", trend: "Classic" },
    { id: 9, name: "Silk Dress", img: "/dress/silk-pattern.webp", color: "Blue", trend: "Casual" },
    { id: 10, name: "Summer Dress", img: "/dress/flora.webp", color: "Yellow", trend: "Summer" },
    { id: 11, name: "Casual Dress", img: "/dress/flora.webp", color: "Green", trend: "Casual" }
  ];

  const handleSearchChange = (e: any) => {
    setSearchTerm(e.target.value);
  };


  const filteredDresses = dresses.filter(dress =>
    dress.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    setSuggestions([]);
  };


  return (
    <>
      <Header />
        {/* Search Bar (Fixed) */}
        <div className="fixed bg-white top-0 left-0 w-full mt-16 py-4 px-6 flex justify-center border-b z-40">
      <div className="relative flex flex-1 items-center w-full max-w-[1200px]">
              <label className="flex flex-1 items-center gap-2 px-4 py-3.5 border-b rounded-full cursor-pointer min-w-[296px] h-[54px] max-md:min-w-[unset] bg-white relative z-10">
                <input
                  type="text"
                  placeholder="Search a Dress"
                  className="bg-transparent outline-none w-full text-black placeholder-black"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </label>
                {/* Submit Button */}
            <button
              type="submit"
              className="px-10 py-3.5 font-medium text-white bg-black rounded-lg cursor-pointer transition-colors duration-200 ease-in-out hover:bg-zinc-700 h-[54px] w-[236px] max-md:w-[calc(50%_-_6px)] max-sm:w-full"
            >
              Search
            </button>

              {/* Suggestions dropdown (Fixed z-index and positioning) */}
              {suggestions.length > 0 && (
                <ul className="absolute top-full left-0 w-full bg-white border rounded-lg shadow-md mt-2 z-50 max-h-52 overflow-y-auto">
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </div>
        </div>
 <div className="mx-auto gap-10 flex mb-4 ">
<section className="text-headingchild text-md min-w-[30%] sticky top-[100px] h-screen mt-[150px] flex flex-col justify-between z-10  bg-white border-r p-6 ">

  <h2 className="text-2xl tracking-tighter font-semibold mb-4">Filters</h2>
  {/* Categories */}
  <div className="mb-4 ">
    <label className="block text-gray-700 font-medium">Categories</label>
    <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400">
      <option value="">All Categories</option>
      <option value="Casual Wear">Casual Wear</option>
      <option value="Formal Wear">Formal Wear</option>
      <option value="Party Wear">Party Wear</option>
      <option value="Ethnic Wear">Ethnic Wear</option>
      <option value="Wedding & Bridal Wear">Wedding & Bridal Wear</option>
      <option value="Fusion Wear">Fusion Wear</option>
    </select>
  </div>

  {/* Subcategories */}
  <div className="mb-4">
    <label className="block text-gray-700 font-medium">Subcategories</label>
    <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400">
      <option value="">All Subcategories</option>
      <optgroup label="Men">
        <option value="Shirts">Shirts</option>
        <option value="Suits">Suits</option>
        <option value="Kurtas">Kurtas</option>
        <option value="Sherwanis">Sherwanis</option>
        <option value="Jackets">Jackets</option>
        <option value="Blazers">Blazers</option>
        <option value="Jeans">Jeans</option>
        <option value="Trousers">Trousers</option>
      </optgroup>
      <optgroup label="Women">
        <option value="Dresses">Dresses</option>
        <option value="Tops">Tops</option>
        <option value="Sarees">Sarees</option>
        <option value="Lehengas">Lehengas</option>
        <option value="Kurtis">Kurtis</option>
        <option value="Gowns">Gowns</option>
        <option value="Co-ord Sets">Co-ord Sets</option>
        <option value="Jumpsuits">Jumpsuits</option>
        <option value="Jeans">Jeans</option>
        <option value="Skirts">Skirts</option>
        <option value="Anarkali">Anarkali</option>
        <option value="Sharara">Sharara</option>
        <option value="Plazo">Plazo</option>
      </optgroup>
    </select>
  </div>

  {/* Colors */}
  <div className="mb-4">
    <label className="block text-gray-700 font-medium">Colors</label>
    <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400">
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

  {/* Fabric Type */}
  <div className="mb-4">
    <label className="block text-gray-700 font-medium">Fabric Type</label>
    <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400">
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

  {/* Occasion */}
  <div className="mb-4">
    <label className="block text-gray-700 font-medium">Occasion</label>
    <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400">
      <option value="">All Occasions</option>
      <option value="Casual Outing">Casual Outing</option>
      <option value="Office Wear">Office Wear</option>
      <option value="Party">Party</option>
      <option value="Wedding">Wedding</option>
      <option value="Festival">Festival</option>
      <option value="Sports">Sports</option>
    </select>
  </div>

  {/* Sleeve Type */}
  <div className="mb-4">
    <label className="block text-gray-700 font-medium">Sleeve Type</label>
    <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400">
      <option value="">All Sleeve Types</option>
      <option value="Sleeveless">Sleeveless</option>
      <option value="Short Sleeve">Short Sleeve</option>
      <option value="Half Sleeve">Half Sleeve</option>
      <option value="Full Sleeve">Full Sleeve</option>
      <option value="Off-Shoulder">Off-Shoulder</option>
      <option value="Cold Shoulder">Cold Shoulder</option>
    </select>
  </div>

  {/* Fit & Style */}
  <div className="mb-4">
    <label className="block text-gray-700 font-medium">Fit & Style</label>
    <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400">
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

  {/* Reset Filters Button */}
  <button
    className="w-full px-4 py-2 bg-black text-white font-medium rounded-lg hover:bg-red-600 transition duration-200"
  >
    Reset Filters
  </button>
</section>

        <section className="max-w-full mt-[220px]">
        {searchTerm && (
        <div className="mt-8 grid grid-cols-4 gap-6">
          {filteredDresses.length > 0 ? (
            filteredDresses.map(dress => (
              <div key={dress.id} className="w-full h-full hover:shadow hover:rounded-2xl flex flex-col justify-center items-center transition-all duration-200 ease-in-out bg-white rounded-2xl">
                <img
                  src={dress.img}
                  alt={dress.name}
                  className="object-cover w-full h-auto p-4"
                />
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center text-gray-500">
              No dresses found.
            </div>
          )}
        </div>
      )}
        </section>

      </div>
      <Footer />
    </>
  );
}
