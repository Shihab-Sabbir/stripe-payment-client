import { IUser } from "@/types/interface";
import create from "zustand";

interface AuthState {
  user: {
    accessToken: { token: string; expires: number };
    name?: string;
    email: string;
  } | null;
  login: (data: IUser) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  login: (data: IUser) => {
    set({
      user: data,
    });
  },
  logout: () => {
    set({
      user: null,
    });
    localStorage.removeItem("stripe-user");
  },
}));

export default useAuthStore;
