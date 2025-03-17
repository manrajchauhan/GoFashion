"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

interface ImageData {
  _id: string;
  imageName: string;
  imageDescription: string;
  imageUrl: string;
  category: string;
  color: string;
  fabric: string;
  createdAt: string;
}

export default function LibraryPage() {
  const [images, setImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<any | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);

  const SUPERUSER_EMAIL = "m900413089@gmail.com";
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      router.push("/user/dashboard");
      return;
    }

    setAuthToken(token);

    const fetchUserData = async () => {
      try {
        const response = await axios.get("/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const user = response.data.user;
        setUserData(user);

        if (user?.email !== SUPERUSER_EMAIL) {
          router.push("/user/dashboard");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        router.push("/user/dashboard");
      }
    };

    fetchUserData();
  }, [router]);



  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("/api/library");
        if (response.status === 200) {
          setImages(response.data.images);
        } else {
          setError("Failed to fetch images.");
        }
      } catch (err) {
        setError("Failed to fetch images");
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const handleDelete = async (imageId: string) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this image?");
    if (!isConfirmed) return;

    try {
      const response = await axios.delete(`/api/library/${imageId}`);
      if (response.status === 200) {
        setImages(images.filter((image) => image._id !== imageId));
        toast.success("Image deleted successfully!");
      } else {
        toast.error("Failed to delete image.");
      }
    } catch (err) {
      toast.error("Error deleting image.");
    }
  };


  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="px-6 py-8">
      <ToastContainer />
      <h1 className="text-2xl font-semibold mb-6">Image Library</h1>
      {images.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          <p>No images available. Upload some images to get started!</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Image</th>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Category</th>
                <th className="py-3 px-6 text-left">Color</th>
                <th className="py-3 px-6 text-left">Fabric</th>
                <th className="py-3 px-6 text-left">Uploaded Date</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {images.map((image) => (
                <tr key={image._id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-6">
                    <img src={image.imageUrl} alt={image.imageName} className="w-16 h-16 object-cover rounded-md" />
                  </td>
                  <td className="py-3 px-6 break-all whitespace-normal max-w-xs">{image.imageName}</td>
                  <td className="py-3 px-6">
                    <h1 className="bg-blue-200 text-black py-2 rounded-full text-xs text-center ">
                      {image.category}
                    </h1>
                  </td>
                  <td className="py-3 px-6">{image.color}</td>
                  <td className="py-3 px-6">{image.fabric}</td>
                  <td className="py-3 px-6">{new Date(image.createdAt).toLocaleDateString()}</td>
                  <td className="py-3 px-6">
                    <button
                      onClick={() => handleDelete(image._id)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
