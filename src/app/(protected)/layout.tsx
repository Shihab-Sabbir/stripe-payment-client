import CheckAuth from "@/components/CheckAuth";
import Navbar from "@/components/Navbar";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-[1400px] mx-auto">
      <Navbar />
      <div className="p-4 bg-gray-100 h-[calc(100vh_-_50px)]">
        <CheckAuth>{children}</CheckAuth>
      </div>
    </div>
  );
}
