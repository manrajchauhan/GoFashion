import React from 'react'

const howItWorksSteps = [
    {
      step: "1",
      title: "Explore Fashion Inspirations",
      description: "Browse our vast collection of curated fashion images, categorized by style, fabric, and trends.",
    },
    {
      step: "2",
      title: "Save Your Favorites",
      description: "Create your personal collection by saving images that inspire your creativity.",
    },
    {
      step: "3",
      title: "Organize with Projects",
      description: "Group your saved inspirations into projects to plan and refine your fashion ideas.",
    },
    {
      step: "4",
      title: "Stay Updated with Trends",
      description: "Discover the latest fashion trends and seasonal highlights to stay ahead in style.",
    },
];

export default function HowWorks() {
  return (
    <section className="pt-40 pb-32 overflow-hidden">
      <div className="px-14 mx-auto">
        <h2 className="mb-28 text-6xl md:text-8xl font-bold text-neutral-600 tracking-tighter leading-tight text-center">
          How It <span className='text-black'>Works?</span>
        </h2>
        <div className="flex flex-wrap -m-8">
          {howItWorksSteps.map((step, index) => (
            <div key={index} className="w-full md:w-1/2 lg:w-1/4 p-8">
              <div className="flex flex-wrap items-center mb-7 -m-2">
                <div className="w-auto p-2">
                  <div className="relative w-14 h-14 text-2xl font-bold bg-black rounded-full">
                    <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-neutral-50">
                      {step.step}
                    </span>
                  </div>
                </div>
                <div className="flex-1 p-2">
                  <div className="w-full h-px bg-gray-200"></div>
                </div>
              </div>
              <h3 className="text-2xl font-semibold leading-normal tracking-tighter md:max-w-lg">{step.title}</h3>
              <p className="text-xl text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
