"use client";
import { DragCards } from "@/app/components/ui/cards";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

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

export default function AppDemo() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("query") || "";
  const [searchTerm, setSearchTerm] = useState(initialSearch);
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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    setSuggestions([]);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div className="min-h-screen relative">
      <div className="px-20 mt-10">
        <form
          onSubmit={handleSearchSubmit}
          className="flex flex-col justify-center px-7 py-8 w-full bg-neutral-50 rounded-[14px] overflow-visible max-md:p-5 max-sm:p-4 relative"
        >
          <div className="flex flex-wrap gap-2 max-sm:flex-col relative">
            {/* Search Field */}
            <div className="relative flex flex-1 items-center w-full">
              <label className="flex flex-1 items-center gap-2 px-4 py-3.5 border-b rounded-full cursor-pointer min-w-[296px] h-[54px] max-md:min-w-[unset] bg-white relative z-10">
                <input
                  type="text"
                  placeholder="Search a Dress"
                  className="bg-transparent outline-none w-full text-black placeholder-black"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </label>

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

            {/* Submit Button */}
            <button
              type="submit"
              className="px-10 py-3.5 font-medium text-white bg-black rounded-lg cursor-pointer transition-colors duration-200 ease-in-out hover:bg-zinc-700 h-[54px] w-[236px] max-md:w-[calc(50%_-_6px)] max-sm:w-full"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {/* Cards Component */}
      <DragCards />
    </div>
  );
}
