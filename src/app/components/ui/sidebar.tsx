"use client";

import Link from "next/link";
import React, { useEffect,useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import axios from "axios";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
    const superuser = "m900413089@gmail.com";
    const [isAuthenticated, setIsAuthenticated] = React.useState<boolean | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const authToken = localStorage.getItem("authToken");
      setAuthToken(authToken);
      setIsAuthenticated(!!authToken);
      if (!authToken) router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    if (authToken) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get('/api/users', {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          });
          const user = response.data.user;
          setUserData(user);
    } catch (fetchError: any) {
      setError('Failed to fetch user data');
      console.error('Error fetching user data:', fetchError.response?.data || fetchError.message);
    }
  };
      fetchUserData();
    }
  }, [authToken]);

  if (isAuthenticated === null) return null;

  const toggleSidebar = () => setIsOpen(!isOpen);

  const mainMenu = [
    { href: "/user/dashboard", icon: "/icon/dash.svg", label: "Dashboard" },
    { href: "/user/favourite", icon: "/icon/fav.svg", label: "Favourite" },
    { href: "/user/library", icon: "/icon/files.svg", label: "Library", condition: authToken && userData?.email === superuser },
  ];


  const settingsLink = { href: "/user/settings", icon: "/icon/settings.svg", label: "Settings" };

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

      <ul className="mb-8 flex-1 text-sm font-medium">
  {mainMenu.map((item, index) => (
    item.condition !== false && (
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
    )
  ))}
</ul>

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
      </div>
    </aside>
  );
}
