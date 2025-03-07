"use client";
import { GeistSans } from 'geist/font/sans';
import { useState } from "react";
import "@/app/globals.css";
import Sidebar from "@/app/components/ui/sidebar";
import DasHeader from "@/app/components/ui/dasheader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className={GeistSans.className}>
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 w-full z-10">
        <DasHeader />
      </div>

      <div className="flex flex-1 pt-[60px]">
        <div className="fixed top-[75px] left-0 w-[240px] z-20">
          <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        </div>
        <main
          className="flex-1 overflow-y-auto pl-4 py-4 transition-all duration-300"
          style={{ marginLeft: isSidebarOpen ? '240px' : '60px' }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
