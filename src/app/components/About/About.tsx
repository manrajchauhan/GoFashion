import React from 'react';

export default function About() {
  return (
    <div className="mt-20">
      <section className="py-2">
        <div className="px-14 mx-auto">
        <h2 className="mb-28 text-6xl md:text-8xl font-bold text-neutral-600 tracking-tighter leading-tight md:max-w-2xl">
          <span className='text-black'>About</span> Us
        </h2>
          <div className="max-w-4xl px-8 mb-20 mx-auto text-center">
            <p className="text-xl lg:text-2xl tracking-tight mb-10">
              <span>GoFashion is a revolutionary platform that empowers users to design and customize their own dresses with ease.</span>
              <span className="italic text-neutral-600"> Our cutting-edge tools allow you to bring your fashion ideas to life, preview designs in real-time, and personalize them to match your style.</span>
              <span> Whether you're a fashion enthusiast or a designer, GoFashion provides a seamless experience to create, modify, and visualize unique outfits effortlessly.</span>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
