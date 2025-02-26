'use client';
import React, { useState } from "react";

export default function AppDemo() {
  const [searchTerm, setSearchTerm] = useState("");

  const dresses = [
    { id: 1, name: "Floral Dress", img: "/dress/flora.webp", color: "Floral", trend: "Summer" },
    { id: 2, name: "Red Dress", img: "https://via.placeholder.com/150?text=Red", color: "Red", trend: "Trending" },
    { id: 3, name: "Black Dress", img: "https://via.placeholder.com/150?text=Black", color: "Black", trend: "Classic" },
    { id: 4, name: "Blue Dress", img: "https://via.placeholder.com/150?text=Blue", color: "Blue", trend: "Casual" },
    { id: 5, name: "Summer Dress", img: "https://via.placeholder.com/150?text=Summer", color: "Yellow", trend: "Summer" },
    { id: 6, name: "Casual Dress", img: "https://via.placeholder.com/150?text=Casual", color: "Green", trend: "Casual" }
  ];

  const handleSearchChange = (e: any) => {
    setSearchTerm(e.target.value);
  };

  // Filter dresses based on search term
  const filteredDresses = dresses.filter(dress =>
    dress.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
    <div className="px-20">
      <form
        className="flex flex-col justify-center px-7 py-8 w-full bg-white rounded-[14px] overflow-hidden max-md:p-5 max-sm:p-4 mt-[-48px]"
      >
        <div className="flex flex-wrap gap-2 max-sm:flex-col">
          {/* Search Field */}
          <label className="flex flex-1 items-center gap-2 px-4 py-3.5 border-b rounded-full cursor-pointer min-w-[296px] h-[54px] max-md:min-w-[unset]">
            <i className="ti ti-map-pin text-lg text-stone-500" />
            <input
              type="text"
              placeholder="Search a Dress"
              className="bg-transparent outline-none w-full text-black placeholder-black"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </label>

          {/* Filter Fields */}
          {["Colors", "Trending"].map((label, index) => (
            <label
              key={index}
              className="flex items-center gap-2 px-4 py-3.5 rounded cursor-pointer h-[54px] w-[140px] max-md:w-[calc(50%_-_6px)] max-sm:w-full"
            >
              <i className="ti ti-calendar text-lg text-stone-500" />
              <select className="bg-transparent outline-none w-full cursor-pointer">
                <option value="">{label}</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
              </select>
            </label>
          ))}

          {/* Submit Button */}
          <button
            type="submit"
            className="px-10 py-3.5 font-medium text-white bg-black rounded-lg cursor-pointer transition-colors duration-200 ease-in-out hover:bg-zinc-700 h-[54px] w-[236px] max-md:w-[calc(50%_-_6px)] max-sm:w-full"
          >
            Find a Dress
          </button>
        </div>
      </form>

      {/* Image Section (Display Images while Searching) */}
      {searchTerm && (
        <div className="mt-8 grid grid-cols-3 gap-4">
          {filteredDresses.length > 0 ? (
            filteredDresses.map(dress => (
              <div key={dress.id} className="w-full h-full rounded-lg border flex flex-col justify-center items-center">
                <img
                  src={dress.img}
                  alt={dress.name}
                  className="object-cover w-full h-[200px]"
                />
                <div className="mt-4 text-center p-2">
                  <h3 className="font-semibold text-lg">{dress.name}</h3>
                  <p className="text-sm text-gray-600">Color: {dress.color}</p>
                  <p className="text-sm text-gray-600">Trend: {dress.trend}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center text-gray-500">
              No dresses found.
            </div>
          )}
        </div>
      )}
    </div>
    <div>
    </div>
    </>
  );
}
