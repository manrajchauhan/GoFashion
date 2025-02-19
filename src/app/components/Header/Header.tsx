'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHomePage = pathname === '/';

  const logoSrc = isHomePage
    ? isSticky
      ? "/logo.png"
      : "/logo-white.png"
    : isSticky
    ? "/logo.png"
    : "/logo.png";

  const loginButtonClasses = `hidden lg:block py-2 px-4 text-[16px] rounded-lg border transition duration-200 ${
    isHomePage
      ? isSticky
        ? 'text-black  border border-neutral-300'
        : 'text-white border border-neutral-300'
      : 'text-black border border-neutral-300'
  }`;

  const registerButtonClasses = `hidden lg:block py-2 px-6 rounded-lg text-[16px] transition duration-200 ${
    isHomePage
      ? isSticky
        ? 'text-white bg-black'
        : 'text-black bg-white'
      : 'text-white bg-black'
  }`;

  const mobileButtonClasses = `block text-center py-3 px-5 rounded-full border border-gray-300 shadow text-sm font-semibold text-neutral-800 transition duration-200`;

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isSticky ? 'bg-white  py-3' : 'py-4'}`}>
      <div className="px-10 mx-auto flex items-center justify-between">
        <Link href="/">
          <Image
            src={logoSrc}
            alt="Brand Logo"
            width={200}
            height={50}
          />
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className={loginButtonClasses}
          >
            Login
          </Link>
          <Link
            href="/register"
            className={registerButtonClasses}
          >
            Register
          </Link>
        </div>
        <button onClick={toggleMenu} className="lg:hidden focus:outline-none bg-gray-200 p-2 rounded-full">
          <svg width="51" height="51" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="56" height="56" rx="28" fill="none"></rect>
            <path d="M37 32H19M37 24H19" stroke={isSticky ? 'white' : 'black'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed top-0 left-0 bottom-0 w-4/6 sm:max-w-xs z-50">
          <div className="fixed inset-0 bg-gray-800 opacity-80" onClick={toggleMenu}></div>
          <nav className="relative z-10 px-9 py-8 h-full bg-white flex flex-col gap-12">
            <div className="flex items-center justify-between">
              <Image
                src={logoSrc}
                alt="Brand Logo"
                width={150}
                height={100}
                priority
                className={`${isSticky ? 'invert' : ''}`}
              />
              <button onClick={toggleMenu} className="bg-gray-200 p-2 rounded-full">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 18L18 6M6 6L18 18" stroke={isSticky ? 'white' : 'black'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </button>
            </div>
            <Link
              href="/login"
              className={mobileButtonClasses}
            >
              Login
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
