"use client";
import React from "react";

interface PreviewModelsProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  imageAlt: string;
  description: string;
  category: string;
  fabric: string;
  sleeveType: string;
  occasion: string;
  fitStyle: string;
  pattern: string;
}

export default function PreviewModels({
  isOpen,
  onClose,
  imageSrc,
  imageAlt,
  description,
  category,
  fabric,
  sleeveType,
  occasion,
  fitStyle,
  pattern,
}: PreviewModelsProps) {
  if (!isOpen) return null;

  const Tags = [
    { id: 1, name: category, icon: "/icon/category.svg" },
    { id: 2, name: fabric, icon: "/icon/subcategory.svg" },
    { id: 3, name: sleeveType, icon: "/icon/sleeve.svg" },
    { id: 4, name: occasion, icon: "/icon/Occasion.svg" },
    { id: 5, name: fitStyle, icon: "/icon/neck.svg" },
    { id: 6, name: pattern, icon: "/icon/pattern.svg" },
  ];
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-6">
      <div className="bg-gray-50 p-5 rounded-lg shadow-lg max-w-6xl w-full relative h-[90%]">
        {/* Close Button */}
        <button
        className="flex top-6 absolute right-10"
onClick={onClose}
      >
        <svg
          className="rounded-full border border-neutral-700 p-2"
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 18L18 6M6 6L18 18"
            stroke="#111827"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </button>
        {/* Header */}
        <div className="flex items-center mb-4">
          <img src="/logo.svg" alt="Business Logo" className="max-w-40 rounded-full" />
          <h1 className="ml-4 font-bold text-green-800 text-sm">Preview</h1>
        </div>

        {/* Main Content */}
        <div className="border-t px-4 py-4">
          <h1 className="text-xl font-medium mt-2">{imageAlt}</h1>

          <div className="flex gap-6">
            {/* Image Section */}
            <div className="w-1/3 mt-10">
              <img
                src={imageSrc}
                alt={imageAlt}
                className="object-cover w-auto h-[420px] rounded-lg"
              />
            </div>

            {/* Details Section */}
            <div className="flex flex-col gap-4 mt-8">
              <div>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  {Tags.map((tag) => (
                    <div key={tag.id} className="flex items-center gap-3 bg-white p-2 rounded-lg">
                      <img src={tag.icon} alt="icon" className="w-6 h-6" />
                      <p>{tag.name}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-10">
                <h2 className="font-semibold text-lg">Description:</h2>
                <p className="text-gray-700">{description}</p>
              </div>

              {/* Download Button */}
              <div className="mt-4 bg-[#EC5B24] w-1/2 text-center rounded-xl">
                <a
                  href={imageSrc}
                  download
                  className="px-4 py-2 text-white rounded-lg gap-2 hover:bg-orange-700 flex transition-all duration-500"
                >
                  <img src="/icon/download.svg" alt="Download" className="w-6 h-6" />
                  <span>Download</span>
                </a>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
