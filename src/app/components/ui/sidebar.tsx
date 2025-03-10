"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const authToken = localStorage.getItem("authToken");
      setIsAuthenticated(!!authToken);
      if (!authToken) router.push("/login");
    }
  }, [router]);

  if (isAuthenticated === null) return null;

  const toggleSidebar = () => setIsOpen(!isOpen);

  const mainMenu = [
    { href: "/user/dashboard", icon: "/icon/dash.svg", label: "Dashboard" },
    { href: "/user/projects", icon: "/icon/project.svg", label: "Projects" },
    { href: "/user/favourite", icon: "/icon/fav.svg", label: "Favourite" },
    { href: "/user/trash", icon: "/icon/trash.svg", label: "Trash" },
    { href: "/user/library", icon: "/icon/files.svg", label: "Library" },
  ];

  const settingsLink = { href: "/user/settings", icon: "/icon/settings.svg", label: "Settings" };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("userData");
    router.push("/login");
  };

  return (
    <aside
      className={`bg-white border-r pt-6 pb-8 overflow-y-auto transition-all duration-300 min-h-screen  ${
        isOpen ? "w-60 px-4" : "w-14"
      } flex flex-col`}
    >
      <button
        onClick={toggleSidebar}
        className={`absolute top-[450px]  ${ isOpen ? "left-[198px]" : "left-[20px]" } bg-neutral-950 text-white rounded-full p-2 shadow-md hover:bg-neutral-800 transition`}
      >
       {isOpen ? <img src="/icon/arrow_right.svg" alt="Close" className="w-5 h-5" /> : <img src="/icon/arrow_left.svg" alt="Open" className="w-5 h-5 " />}
      </button>

      {/* Main Menu */}
      <ul className="mb-8 flex-1 text-sm font-medium">
        {mainMenu.map((item, index) => (
          <li key={index}>
            <Link
              href={item.href}
              className={`flex items-center pl-3 py-4 pr-4 font-semibold text-[18px] tracking-tighter rounded ${
                pathname === item.href ? "text-orange-600" : "text-neutral-600 hover:text-orange-600"
              }`}
            >
              <img src={item.icon} alt={item.label} className="w-5 h-5 mr-3" />
              {isOpen && <span>{item.label}</span>}
            </Link>
          </li>
        ))}
      </ul>

      {/* Settings and Logout (pushed to the bottom) */}
      <div className="mb-20">
        <Link
          href={settingsLink.href}
          className={`flex items-center pl-3 py-3 pr-4 font-semibold text-[18px] tracking-tighter rounded ${
            pathname === settingsLink.href ? "text-orange-600" : "text-neutral-600 hover:text-orange-600"
          }`}
        >
          <img src={settingsLink.icon} alt="Settings" className="w-5 h-5 mr-3" />
          {isOpen && <span>Settings</span>}
        </Link>

        {/* <button
          onClick={handleLogout}
          className="w-40 flex items-center justify-start px-3 py-3 text-[18px] font-semibold tracking-tighter text-white border border-black rounded-full hover:bg-orange-500 bg-orange-600 transition duration-200 mt-4"
        >
          <img src="/icon/log.svg" alt="Log Out" className="w-5 h-5 mr-3" />
          {isOpen && "Log Out"}
        </button> */}
      </div>
    </aside>
  );
}
