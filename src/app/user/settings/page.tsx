"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function UserProfile() {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setAuthToken(token);
  }, []);

  useEffect(() => {
    if (authToken) {
      const fetchUserData = async () => {
        setLoading(true);
        try {
          const response = await axios.get("/api/users", {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          });
          setUserData(response.data.user);
        } catch (fetchError: any) {
          setError("Failed to fetch user data");
          console.error("Error fetching user data:", fetchError.message);
        } finally {
          setLoading(false);
        }
      };

      fetchUserData();
    }
  }, [authToken]);

  return (
    <div className="p-6 w-full bg-white rounded-2xl max-md:px-4 max-md:max-w-full mt-4">
      <h1 className="text-xl font-semibold text-neutral-700 mb-6">Settings</h1>

      {loading ? (
        <></>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="flex gap-10 max-md:flex-col">
          {/* Profile Picture */}
          <div className="flex flex-col max-md:w-full">
            <img
              src={userData?.profilePicture || "/logo.svg"}
              className="object-contain aspect-square w-32 rounded-full"
              alt="User Profile"
            />
          </div>

          {/* Profile Details */}
          <div className="flex flex-col ml-5 max-md:ml-0 max-md:w-full">
            <form className="space-y-6 text-black max-md:mt-6">
              <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
                <InputField label="Client ID" value={userData?.client_id || "N/A"} />
              </div>
              <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
                <InputField label="Name" value={userData?.name || "N/A"} />
                <InputField label="Surname" value={userData?.surname || "N/A"} />
                <InputField label="Email" value={userData?.email || "N/A"} />
                <InputField label="Phone Number" value={userData?.mobile || "N/A"} />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const InputField = ({ label, value }: { label: string; value?: string }) => (
  <div>
    <label className="text-base font-medium">{label}</label>
    <input
      type="text"
      value={value || "N/A"}
      disabled
      className="mt-2 px-3 py-2 rounded-lg bg-gray-100 font-light text-sm text-neutral-700 w-full"
    />
  </div>
);
