'use client'

import AuthBanner from "@/components/AuthBanner";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-screen flex items-center">
      <AuthBanner />
      <div className="h-screen w-full grid place-content-center">
        {children}
      </div>
    </div>
  );
}
