"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import UserModel from "../models/UserModel";
import Link from "next/link";

export default function DasHeader() {

    const [isSettingsModalOpen, setSettingsModalOpen] = useState(false);

    const toggleSettingsModal = () => {
      setSettingsModalOpen(!isSettingsModalOpen);
    };

  const pathname = usePathname();

  const userIcon = {
    href: "#",
    imgSrc: "/icon/user-demo.svg",
    alt: "User",
  };


  const renderLinks = (linksArray: { href: string; imgSrc: string; alt: string; text: string }[]) =>
    linksArray.map((link, index) => (
      <li key={index} className="relative">
         {link.href === "/user/dashboard" && (
    <div className="absolute h-2 w-2 animate-pulse bg-green-500 rounded-full right-7 top-2"></div>
  )}
        <Link
          className={`flex mr-10 items-center text-md font-semibold  ${
            pathname === link.href ? "text-orange-600" : "text-neutral-600 hover:text-neutral-400"
          }`}
          href={link.href}
        >
          <img src={link.imgSrc} alt={link.alt} className="px-2 w-8 h-8" />
          <span>{link.text}</span>
        </Link>
      </li>
    ));

  return (
    <>
    <div className="bg-orange-600 w-full h-0.5 "></div>
    <div className=" py-1 px-6 bg-white border-b ">
      <div className="flex items-center relative">
        {/* Logo */}
        <div className="mr-32">
          <a className="text-xl text-white font-semibold" href="/user/dashboard">
            <img className="h-10" src="/logo.svg" alt="Logo" width="auto" />
          </a>
        </div>

        <ul className="ml-auto flex gap-7 py-2">
        <Link href="/user/upload" className="bg-orange-100 px-4 hover:bg-orange-50 mt-2 rounded-xl flex gap-2 items-center">
        <img src="/upload.svg" alt="Upload" className="w-6 h-6"/>
            <button>
                <h1>Upload</h1>
            </button>
            </Link>

          <li className="mt-2 cursor-pointer" id="userIcon"onClick={toggleSettingsModal}>
          <img
                        width={40}
                        height={40}
                          src={userIcon.imgSrc}
                          alt={userIcon.alt}
                          className="bg-neutral-200 lg:inline-flex leading-none hover:text-black rounded-full hover:bg-neutral-100 transition duration-200 font-semibold ml-4"
                        />
          </li>

          {isSettingsModalOpen && (
        <div id="settingsModal" className="fixed inset-0 overflow-y-auto w-full top-[66px] z-50">
          <UserModel />
        </div>
      )}
        </ul>

      </div>
    </div>
    </>
  );
}
