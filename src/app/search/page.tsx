"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Filter from "../components/ui/filter";
import PreviewModels from "../components/models/PreviewModels";

const SearchContent = () => {
    const [liked, setLiked] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialSearch = searchParams.get("query") || "";
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [filters, setFilters] = useState({
    category: "",
    color: "",
    fabric: "",
    sleeveType: "",
    occasion: "",
    fitStyle: "",
    pattern: "",
  });
  const [dresses, setDresses] = useState<Dress[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDress, setSelectedDress] = useState<Dress | null>(null);

  interface Dress {
    _id: string;
    imageName: string;
    imageDescription: string;
    imageUrl: string;
    category: string;
    subcategory: string;
    color: string;
    fabric: string;
    occasion: string;
    sleeveType: string;
    neckline: string;
    fitStyle: string;
    pattern: string;
  }

  useEffect(() => {
    const fetchDresses = async () => {
      try {
        const response = await fetch(`/api/dresses?q=${searchTerm}`);
        const data = await response.json();
        setDresses(data.results);
      } catch (error) {
        console.error("Error fetching dresses:", error);
      }
    };

    fetchDresses();
  }, [searchTerm]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  const openModal = (dress: Dress) => {
    setSelectedDress(dress);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleFilterChange = (filterType: keyof typeof filters, value: string) => {
    setFilters((prev) => ({ ...prev, [filterType]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      category: "",
      color: "",
      fabric: "",
      sleeveType: "",
      occasion: "",
      fitStyle: "",
      pattern: "",
    });
  };

  const filteredDresses: Dress[] = dresses.filter((dress: Dress) => {
    return (
      dress.imageName.toLowerCase().includes(searchTerm.toLowerCase()) &&
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
      <div className="fixed bg-white top-0 left-0 w-full mt-16 py-4 px-6 flex justify-center border-b z-40">
        <form onSubmit={handleSearchSubmit} className="flex w-full max-w-[1000px] mt-2">
          <input
            type="text"
            placeholder="Search a Dress"
            className="border p-2 flex-1 rounded-xl"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button type="submit" className="ml-2 px-4 py-2 bg-black text-white rounded-xl">
            Search
          </button>
        </form>
      </div>

      <div className="mx-auto gap-10 flex mb-4 mt-[150px]">
        <section className="w-1/4 p-6">
          <Filter onFilterChange={handleFilterChange} />
          <button className="mt-4 px-4 py-2 bg-black hover:bg-orange-600 text-white rounded-xl transition-all duration-600" onClick={handleResetFilters}>
            Reset Filters
          </button>
        </section>


        <section className="w-3/4 mt-4">
          {filteredDresses.length > 0 ? (
            <div className="grid grid-cols-4 gap-6">
              {filteredDresses.map((dress) => (
                <div
                  key={dress._id}
                  onClick={() => openModal(dress)}
                  className="cursor-pointer p-2"
                >
                   <div className="relative group">
      <img
        src={dress.imageUrl}
        alt={dress.imageName}
        className="w-full h-auto rounded-xl transition duration-300 ease-in-out group-hover:opacity-90"
      />
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40 rounded-xl opacity-0 group-hover:opacity-100 transition duration-300"></div>

      {/* Image Name on Hover */}
      <div className="absolute bottom-5 left-2 text-white text-sm font-normal opacity-0 group-hover:opacity-100 transition duration-300">
        {dress.imageName}
      </div>

  <button
  onClick={() => setLiked(!liked)}
  className="absolute top-4 right-4 flex items-center justify-center rounded-lg w-[35px] h-[30px] shadow-[0_0_60px_rgba(34,_34,_34,_0.25)] bg-white hover:bg-gray-200 text-black opacity-0 group-hover:opacity-100 transition duration-300 z-50"
>
  <img src="/icon/fav.svg" alt="like" className="w-5 h-5" />
</button>
    </div>
                </div>

              ))}
            </div>
          ) : (
            <p className="mt-10 text-gray-500">No dresses found.</p>
          )}
        </section>
      </div>

      {selectedDress && (
        <PreviewModels
          isOpen={isModalOpen}
          onClose={closeModal}
          imageSrc={selectedDress.imageUrl}
          imageAlt={selectedDress.imageName}
          description={selectedDress.imageDescription}
          category={selectedDress.category}
          fabric={selectedDress.fabric}
          sleeveType={selectedDress.sleeveType}
          occasion={selectedDress.occasion}
          fitStyle={selectedDress.fitStyle}
          pattern={selectedDress.pattern}
        />
      )}
      <Footer />
    </>
  );
};

export default function SearchPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <SearchContent />
    </Suspense>
  );
}
