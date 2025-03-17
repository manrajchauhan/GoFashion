"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Filter from "../components/ui/filter";
import PreviewModels from "../components/models/PreviewModels";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";


const SearchContent = () => {
    const [likedItems, setLikedItems] = useState<string[]>([]);
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
    const [authToken, setAuthToken] = useState<string | null>(null);
    const [userData, setUserData] = useState<any>(null);
    const [clientId, setClientId] = useState<string | null>(null);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDresses = async () => {
        try {
          const queryParams = new URLSearchParams();
          queryParams.append("q", searchTerm);
          Object.entries(filters).forEach(([key, value]) => {
     if (value) queryParams.append(key, value);
          }); const response = await axios.get(`/api/dresses?${queryParams.toString()}`);
          setDresses(response.data.results);
        } catch (error) {
          console.error("Error fetching dresses:", error);
        }
      };

      const delaySearch = setTimeout(() => {
        fetchDresses();
      }, 500);
      return () => clearTimeout(delaySearch);
    }, [searchTerm, filters]);

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

  // ✅ Fetch Auth Token
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) setAuthToken(token);
  }, []);

  // ✅ Fetch User Data
  useEffect(() => {
    if (authToken) {
      const fetchUserData = async () => {
        setLoading(true);
        try {
          const response = await axios.get("/api/users", {
            headers: { Authorization: `Bearer ${authToken}` },
          });
          setClientId(response.data.user.client_id);
        } catch (error) {
          setError("Failed to fetch user data");
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchUserData();
    }
  }, [authToken]);

  // ✅ Fetch Dresses When Search Term or Filters Change
  useEffect(() => {
    const fetchDresses = async () => {
      try {
        const queryParams = new URLSearchParams(filters).toString();
        const response = await axios.get(`/api/dresses?q=${searchTerm}&${queryParams}`);
        setDresses(response.data.results);
      } catch (error) {
        console.error("Error fetching dresses:", error);
      }
    };

    fetchDresses();
  }, [searchTerm, filters]); // 🔥 Runs when search or filters change

  useEffect(() => {
    const fetchLikedItems = async () => {
      if (!authToken || !clientId) return;

      try {
        const response = await axios.get(`/api/favourites`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });

        if (response.status === 200) {
          const likedMap = response.data.favourites.reduce((acc: Record<string, boolean>, item: any) => {
            acc[item.imageUrl] = true; // Store liked items in an object for O(1) lookup
            return acc;
          }, {});

          setLikedItems(likedMap); // ✅ Set state as an object
        }
      } catch (error) {
        console.error("Error fetching favorite items:", error);
      }
    };

    fetchLikedItems();
  }, [authToken, clientId]);


  // ✅ Handle Like Button Click (Toggle Like/Unlike)
  const handleLike = async (dress: Dress) => {
    if (!authToken || !clientId) {
      toast.error("Please log in to add to favorites.");
      return;
    }

    const isAlreadyLiked = likedItems[dress.imageUrl];

    try {
      if (isAlreadyLiked) {
        // 🔹 Remove from favorites
        await axios.delete("/api/favourites/delete", {
            headers: { Authorization: `Bearer ${authToken}` },
            data: { imageUrl: dress.imageUrl },
          });

          setLikedItems((prev) => {
            const updated = { ...prev };
            delete updated[dress.imageUrl];
            return updated;
          });

        toast.info("Removed from favourites.");
      } else {
        // 🔹 Add to favorites
        await axios.post(
            "/api/favourites/add",
            {
              imageUrl: dress.imageUrl,
              imageName: dress.imageName,
              imageDescription: dress.imageDescription,
              category: dress.category,
              subcategory: dress.subcategory,
              color: dress.color,
              fabric: dress.fabric,
              occasion: dress.occasion,
              sleeveType: dress.sleeveType,
              neckline: dress.neckline,
              fitStyle: dress.fitStyle,
              pattern: dress.pattern,
            },
            {
              headers: { Authorization: `Bearer ${authToken}` },
            }
          );

          setLikedItems((prev) => ({
            ...prev,
            [dress.imageUrl]: true,
          }));
        toast.success("Added to Favourites!");
      }
    } catch (error) {
      console.error("Error updating favorites:", error);
      toast.error("Failed to update favorites. Please try again.");
    }
  };


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
        {dresses && filteredDresses.length > 0 ? (
            <div className="grid grid-cols-4 gap-6">
                 {filteredDresses.map((dress: Dress) => (
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
                    <div className="absolute inset-0 bg-black bg-opacity-40 rounded-xl opacity-0 group-hover:opacity-100 transition duration-300"></div>
                    <div className="absolute bottom-5 left-2 text-white text-sm font-normal opacity-0 group-hover:opacity-100 transition duration-300">
                      {dress.imageName}
                    </div>
                    <button
                    onClick={(e) => {
                        e.stopPropagation();
                        handleLike(dress);
                    }}
                    className="absolute top-4 right-4 flex items-center justify-center rounded-lg w-[35px] h-[30px] shadow-lg bg-white hover:bg-gray-200 text-black transition duration-300"
                    >
                        <img
                        src={likedItems[dress.imageUrl] ? "/icon/fav-filled.svg" : "/icon/fav.svg"}
                        alt="like"
                        className="w-5 h-5"
                        />

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
    <>
     <ToastContainer position="top-right" autoClose={3000} />
    <Suspense fallback={
        <Image
        className="animate-spin duration-200"
        src={"/icon/loader.svg"}
        alt="loader"
        width={40}
        height={40}
        />
    }>
      <SearchContent />
    </Suspense>
    </>
  );
}
