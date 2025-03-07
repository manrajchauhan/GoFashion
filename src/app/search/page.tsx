"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Filter from "../components/ui/filter";
import PreviewModels from "../components/models/PreviewModels";
import dresses from "../components/extra/dresses";
import dressSuggestions from "../components/extra/dress_suggest";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialSearch = searchParams.get("query") || "";
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    category: "",
    color: "",
    fabric: "",
    sleeveType: "",
    occasion: "",
    fitStyle: "",
    pattern: "",
  });

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
const [selectedFabric, setSelectedFabric] = useState<string | null>(null);
const [selectedSleeveType, setSelectedSleeveType] = useState<string | null>(null);
const [selectedOccasion, setSelectedOccasion] = useState<string | null>(null);
const [selectedFitStyle, setSelectedFitStyle] = useState<string | null>(null);
const [selectedPattern, setSelectedPattern] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedAlt, setSelectedAlt] = useState<string | null>(null);
  const [selectedDesc, setSelectedDesc] = useState<string | null>(null);

  // Fetch search suggestions dynamically
  useEffect(() => {
    if (searchTerm.trim().length > 0) {
      setSuggestions(
        dressSuggestions.filter((dress) =>
          dress.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setSuggestions([]);
    }
  }, [searchTerm]);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Handle clicking on a suggestion
  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    setSuggestions([]); // Hide suggestions after selection
    // router.push(`/search?query=${encodeURIComponent(suggestion)}`);
  };

  // Handle submitting the search
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchTerm)}`);
    }
  };

const openModal = (
    imgSrc: string,
    imgAlt: string,
    desc: string,
    category: string,
    fabric: string,
    sleeveType: string,
    occasion: string,
    fitStyle: string,
    pattern: string
  ) => {
    setSelectedImage(imgSrc);
    setSelectedAlt(imgAlt);
    setSelectedDesc(desc);
    setSelectedCategory(category);
    setSelectedFabric(fabric);
    setSelectedSleeveType(sleeveType);
    setSelectedOccasion(occasion);
    setSelectedFitStyle(fitStyle);
    setSelectedPattern(pattern);
    setIsModalOpen(true);
  };


  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Handle filter changes
  const handleFilterChange = (filterType: string, value: string) => {
    if (filterType === "reset") {
      setFilters({
        category: "",
        color: "",
        fabric: "",
        sleeveType: "",
        occasion: "",
        fitStyle: "",
        pattern: "",
      });
    } else {
      setFilters((prev) => ({ ...prev, [filterType]: value }));
    }
  };

  // Filter dresses based on search term and selected filters
  const filteredDresses = dresses.filter((dress) => {
    return (
      dress.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filters.category === "" || dress.category === filters.category) &&
      (filters.color === "" || dress.color === filters.color) &&
      (filters.fabric === "" || dress.fabric === filters.fabric) &&
      (filters.sleeveType === "" || dress.sleeveType === filters.sleeveType) &&
      (filters.occasion === "" || dress.occasion === filters.occasion) &&
      (filters.fitStyle === "" || dress.fitStyle === filters.fitStyle) &&
      (filters.pattern === "" || dress.pattern === filters.pattern)
    );
  });

  return (
    <>
      <Header />

      {/* Search Bar */}
      <div className="fixed bg-white top-0 left-0 w-full mt-16 py-4 px-6 flex justify-center border-b z-40">
        <div className="relative flex flex-1 items-center w-full max-w-[1200px]">
          <form onSubmit={handleSearchSubmit} className="flex w-full">
            <label className="flex flex-1 items-center gap-2 px-4 py-3.5 border-b rounded-full min-w-[296px] h-[54px] bg-white relative z-10">
              <input
                type="text"
                placeholder="Search a Dress"
                className="bg-transparent outline-none w-full text-black placeholder-black"
                value={searchTerm}
                onChange={handleSearchChange}
                onBlur={() => setTimeout(() => setSuggestions([]), 200)}
              />
            </label>

            <button type="submit" className="ml-4 px-6 py-3 bg-black text-white rounded-lg hover:bg-zinc-700">
              Search
            </button>
          </form>

          {/* Suggestions dropdown */}
          {suggestions.length > 0 && (
            <ul className="absolute top-full left-0 w-full bg-white border rounded-lg shadow-md mt-2 z-50 max-h-52 overflow-y-auto">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onMouseDown={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Layout */}
      <div className="mx-auto gap-10 flex mb-4">
        {/* Sidebar Filter */}
        <section className="text-headingchild text-md min-w-[24%] sticky top-[100px] h-screen mt-[150px] flex flex-col justify-between z-10 bg-white border-r p-6">
          <Filter onFilterChange={handleFilterChange} />
        </section>

      {/* Dresses Grid */}
<section className="max-w-full mt-[140px]">
  {filteredDresses.length > 0 ? (
    <div className="mt-8 grid grid-cols-4 gap-6">
      {filteredDresses.map((dress) => (
        <div
          key={dress.id}
          className="w-full h-full hover:shadow-lg hover:rounded-2xl bg-white rounded-2xl cursor-pointer"
          onClick={() => openModal(
            dress.img,
            dress.name,
            dress.description,
            dress.category,
            dress.fabric,
            dress.sleeveType,
            dress.occasion,
            dress.fitStyle,
            dress.pattern
          )}
        >
          <img src={dress.img} alt={dress.name} className="object-cover w-full h-auto p-4" />
        </div>
      ))}
    </div>
  ) : (
    <div className="col-span-3 text-center text-gray-500 mt-10">No dresses found.</div>
  )}
</section>

      </div>

      {/* Preview Modal */}
<PreviewModels
  isOpen={isModalOpen}
  onClose={closeModal}
  imageSrc={selectedImage || ""}
  imageAlt={selectedAlt || ""}
  description={selectedDesc || ""}
  category={selectedCategory || ""}
  fabric={selectedFabric || ""}
  sleeveType={selectedSleeveType || ""}
  occasion={selectedOccasion || ""}
  fitStyle={selectedFitStyle || ""}
  pattern={selectedPattern || ""}
/>


      <Footer />
    </>
  );
}
