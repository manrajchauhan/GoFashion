import React from 'react'

const howItWorksSteps = [
    {
      step: "1",
      title: "Register Your Account",
      description: "Sign up and create your account to access the design tools.",
    },
    {
      step: "2",
      title: "Create Your Dress",
      description: "Use our intuitive application to design a dress from scratch or customize templates.",
    },
    {
      step: "3",
      title: "Preview Your Design",
      description: "Get a realistic preview of your dress to see how it looks before finalizing.",
    },
    {
      step: "4",
      title: "Customize & Finalize",
      description: "Make adjustments, choose materials, and personalize your dress before ordering or saving.",
    },
  ];

export default function HowWorks() {
  return (
    <section className="pt-40 pb-32  overflow-hidden">
      <div className="px-14 mx-auto">
        <h2 className="mb-28 text-6xl md:text-8xl font-bold text-neutral-600 tracking-tighter leading-tight md:max-w-2xl">
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
