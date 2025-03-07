import React from 'react';

export default function About() {
  return (
    <div className="mt-20">
      <section className="py-2">
        <div className="px-14 mx-auto">
          <h2 className="mb-28 text-6xl md:text-8xl font-bold text-neutral-600 tracking-tighter leading-tight text-center">
            <span className='text-black'>About</span> Us
          </h2>
          <div className="max-w-4xl px-8 mb-20 mx-auto text-center">
            <p className="text-xl lg:text-2xl tracking-tight mb-10">
              <span>GoFashion is a unique platform designed to inspire creativity through an extensive collection of fashion images.</span>
              <span className="italic text-neutral-600"> Our carefully curated library showcases a diverse range of styles, patterns, fabrics, and trends, helping designers and fashion enthusiasts find fresh ideas.</span>
              <span> Whether you're exploring the latest trends or seeking timeless inspirations, GoFashion makes it effortless to discover and organize your favorite looks.</span>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
