"use client";

import React from "react";

const projects = [
  {
    id: 1,
    name: "Cotton Silk Dress",
    description: "Viewed 3 days ago",
    image: "/dress/cotton-silk-girl.jpeg",
  },
  {
    id: 2,
    name: "Cotton Silk Dress",
    description: "Viewed 3 days ago",
    image: "/dress/cotton-silk-girl.jpeg",
  },
  {
    id: 3,
    name: "Cotton Silk Dress",
    description: "Viewed 3 days ago",
    image: "/dress/cotton-silk-girl.jpeg",
  },
  {
    id: 4,
    name: "Cotton Silk Dress",
    description: "Viewed 3 days ago",
    image: "/dress/cotton-silk-girl.jpeg",
  },
];

export default function Projects() {
  return (
    <div className="p-6 bg-white rounded-2xl mt-4 min-h-screen">
      <h1 className="text-4xl font-bold tracking-tighter mb-8">Recent Projects</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center">
        {projects.map((project) => (
          <div key={project.id} className="w-full max-w-md mx-auto ">
            <img
              src={project.image}
              alt={project.name}
              className="w-full h-60 object-cover border rounded-xl border-neutral-400  transition-transform duration-200"
            />
            <div className="mt-2">
              <h2 className="text-md font-semibold text-neutral-700">{project.name}</h2>
              <p className="text-sm text-neutral-500">{project.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
