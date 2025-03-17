"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ImageData {
  _id: string;
  client_id: string;
  imageName: string;
  imageDescription: string;
  imageUrl: string;
  createdAt: string;
}

export default function FavouritePage() {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [clientId, setClientId] = useState<string | null>(null);
  const [favourites, setFavourites] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setAuthToken(token);
    } else {
      setError("Please log in to view favorites.");
    }
  }, []);


  useEffect(() => {
    if (!authToken) return;

    const fetchUserData = async () => {
      try {
        const response = await axios.get("/api/users", {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        setClientId(response.data.user.client_id);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to fetch user data.");
      }
    };

    fetchUserData();
  }, [authToken]);


  useEffect(() => {
    if (!authToken || !clientId) return;

    const fetchFavourites = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/favourites?client_id=${clientId}`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });

        if (response.status === 200) {
          setFavourites(response.data.favourites);
        }
      } catch (error) {
        console.error("Error fetching favourites:", error);
        setError("Failed to load favourites.");
      } finally {
        setLoading(false);
      }
    };

    fetchFavourites();
  }, [authToken, clientId]);


  const handleRemoveFavourite = async (imageId: string) => {
    try {
        await axios.delete("/api/favourites/delete", {
            headers: { Authorization: `Bearer ${authToken}` },
            data: { imageUrl: favourites.find((img) => img._id === imageId)?.imageUrl },
          });

      setFavourites(favourites.filter((img) => img._id !== imageId));
      toast.info("Removed from favourites.");
    } catch (error) {
      console.error("Error removing favourite:", error);
      toast.error("Failed to remove from favourites.");
    }
  };

  return (
    <div className="p-6 w-full bg-gray-50 min-h-screen">
      <ToastContainer />
      <h1 className="text-3xl font-bold text-neutral-800 mb-6 tracking-tight">My Favourites</h1>

      {loading && <p className="text-gray-500 text-center">Loading favourites...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}
      {!loading && favourites.length === 0 && <p className="text-gray-500 text-center">No favourites found.</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
        {favourites.map((image) => (
          <div key={image._id} className="relative group bg-white shadow-lg rounded-2xl overflow-hidden transition-transform hover:scale-105">
            <img
              src={image.imageUrl}
              alt={image.imageName}
              className="w-full h-64 object-cover rounded-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 rounded-2xl"></div>

            <div className="absolute bottom-4 left-4 text-white">
              <h2 className="text-sm capitalize font-semibold">{image.imageName}</h2>
              {/* <p className="text-sm text-gray-300">{image.imageDescription}</p> */}
            </div>


            <button
              onClick={() => handleRemoveFavourite(image._id)}
              className="absolute top-4 right-4 flex items-center justify-center rounded-full w-10 h-10 bg-white hover:bg-gray-200 transition-all shadow-md"
            >
                <img
                src={"/icon/fav-filled.svg"}
                alt="like"
                className="w-5 h-5"
                />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
