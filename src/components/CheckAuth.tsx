"use client";

import useAuthStore from "@/store/authStore";
import { IUser } from "@/types/interface";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

interface CheckAuthProps {
  user: IUser; 
  localUser: IUser | null;
  login: (user: IUser) => void; 
  logout: () => void;
  router: AppRouterInstance;
}

function checkAuth({ user, logout, router }: CheckAuthProps) {
  const currentTime = Math.floor(Date.now() / 1000);
  const expireTime = user.accessToken.expires;

  if (expireTime < currentTime) {
    console.log("Token has expired");
    logout();
    router.push("/login");
  }
}

export default function CheckAuth({ children }: { children: React.ReactNode }) {
  const { logout, login, user } = useAuthStore();
  const lStorage =  localStorage.getItem("stripe-user");
  const localUser: IUser | null = lStorage ? JSON.parse(lStorage) : null;
  const router = useRouter();

  useEffect(() => {
    if (localUser && !user) {
      login(localUser);
    }
    if (!lStorage && !user) {
      logout();
      router.push("/login");
    }
    if(lStorage && user){
      checkAuth({ user, localUser, login, logout, router });
    }
   
  }, [user, localUser, login, router, logout, lStorage]);

  if (user) {
    return <div>{children}</div>;
  } 
}
