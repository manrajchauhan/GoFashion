"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import dressSuggestions from "../extra/dress_suggest";

export default function AppDemo() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const router = useRouter();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setSearchTerm(input);

    if (input.length > 0) {
      const filtered = dressSuggestions.filter((dress) =>
        dress.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    setFilteredSuggestions([]);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div className="px-20 relative">
      <form
        onSubmit={handleSearchSubmit}
        className="flex flex-col justify-center px-7 py-8 w-full bg-white rounded-[14px] overflow-visible max-md:p-5 max-sm:p-4 mt-[-48px] md:max-w-[1100px] md:mx-auto relative"
      >
        <div className="flex flex-wrap gap-2 max-sm:flex-col relative">
          {/* Input with suggestions */}
          <div className="relative flex flex-1 items-center">
            <label className="flex flex-1 items-center gap-2 px-4 py-3.5 border-b rounded-full cursor-pointer min-w-[296px] h-[54px] max-md:min-w-[unset] relative z-10">
              <i className="ti ti-map-pin text-lg text-stone-500" />
              <input
                type="text"
                placeholder="Search a Dress"
                className="bg-transparent outline-none w-full text-black placeholder-black"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </label>

            {/* Suggestions dropdown (Fixed z-index and overflow issue) */}
            {filteredSuggestions.length > 0 && (
              <ul className="absolute top-full left-0 w-full bg-white border rounded-lg shadow-lg mt-2 z-50 max-h-60 overflow-y-auto">
                {filteredSuggestions.map((suggestion, index) => (
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

          {/* Search Button */}
          <button
            type="submit"
            className="px-10 py-3.5 font-medium text-white bg-black rounded-lg cursor-pointer transition-colors duration-200 ease-in-out hover:bg-zinc-700 h-[54px] w-[236px] max-md:w-[calc(50%_-_6px)] max-sm:w-full"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
}
