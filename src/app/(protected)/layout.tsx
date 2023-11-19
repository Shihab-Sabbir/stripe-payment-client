"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import dynamic from "next/dynamic";
import React from "react";
const CheckAuth = dynamic(() => import('@/components/CheckAuth'), { ssr: false })

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-[1400px] mx-auto">
      <Navbar />
      <div className="p-4 bg-gray-100 sm:h-[calc(100vh_-_80px)] md:h-[calc(100vh_-_106px)]">
        <CheckAuth>{children}</CheckAuth>
      </div>
      <Footer/>
    </div>
  );
}
