"use client";
import useAuthStore from "@/store/authStore";
import { IUser } from "@/types/interface";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function CheckAuth({ children }: { children: React.ReactNode }) {
  const { logout,login, user } = useAuthStore();
  const lStorage = localStorage.getItem("stripe-user");
  const localUSer: IUser = lStorage && JSON.parse(lStorage);
  const router = useRouter();

  useEffect(() => {
    if(localUSer && user){
        const currentTime = Math.floor(Date.now() / 1000); 
        const expireTime = user.accessToken.expires;
        if (expireTime < currentTime) {
            console.log("Token has expired");
            logout();
            router.push("/login");
        }
    }
    if (localUSer && !user) {
      login(localUSer);
    }
  }, [user, localUSer, login, router, logout]);

  if (user) {
    return <div>{children}</div>;
  } 
  else if (!lStorage && !user) {
    logout();
    router.push("/login");
  }
}
