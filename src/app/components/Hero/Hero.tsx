'use client'
import Link from 'next/link';

export default function Hero() {
  return (
    <div
      className="px-4 md:px-14 pb-16 bg-center bg-no-repeat bg-cover relative z-[-1]"
      style={{ backgroundImage: "url('/hero.png')" }}
    >
      <div className="pt-40 pb-10">
        <h1 className="font-heading tracking-tight text-5xl md:text-7xl text-white font-medium max-w-xs md:max-w-3xl mb-6">
          Elevate Your Fashion Journey
        </h1>
        <p className="tracking-tight text-white text-lg mb-8 max-w-md">
          A platform crafted for fashion designers to explore trends, showcase creativity, and connect with the industry.
        </p>
        <Link href="register">
          <div className="rounded-full border border-gray-200 bg-white px-6 py-4 h-16 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 inline-flex items-center justify-center gap-2 transition duration-200 cursor-pointer">
            <span className="font-bold tracking-tight">Get Started</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M14 6.66666H7.33333C4.38781 6.66666 2 9.05447 2 12V13.3333M14 6.66666L10 10.6667M14 6.66666L10 2.66666" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </div>
        </Link>
      </div>
    </div>
  );
}
