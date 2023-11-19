import useAuthStore from "@/store/authStore";
import useLoadingStore from "@/store/loadingStore";
import {
  AuthError,
  AuthPayload,
  AuthResponse,
  PaymentIntentResponse,
} from "@/types/interface";
import axios, { AxiosInstance } from "axios";

const authAxios: AxiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
});

const useAPI = () => {
  const { startLoading, stopLoading } = useLoadingStore();
  const { logout, user } = useAuthStore();

  if (user) {
    const currentTime = Math.floor(Date.now() / 1000);
    const expireTime = user.accessToken.expires;
    if (expireTime < currentTime) {
      console.log("Token has expired");
      logout();
    }
  }

  const loginUser = async (
    payload: AuthPayload
  ): Promise<AuthResponse | any> => {
    try {
      startLoading();
      const response = await authAxios.post<AuthResponse>(
        "/auth/login",
        payload
      );
      console.log("Login response:", response.data);
      return response.data;
    } catch (error: any) {
      console.error("Login error:", error);
      throw error.response
        ? error.response.data.errorMessages[0].message
        : ({ message: "Unknown error" } as AuthError);
    } finally {
      stopLoading();
    }
  };

  const registerUser = async (
    payload: AuthPayload
  ): Promise<AuthResponse | any> => {
    try {
      startLoading();
      const response = await authAxios.post<AuthResponse>(
        "/auth/register",
        payload
      );
      console.log("Register response:", response.data);
      return response.data;
    } catch (error: any) {
      console.error("Register error:", error);
      throw error.response
        ? error.response.data.errorMessages[0].message
        : ({ message: "Unknown error" } as AuthError);
    } finally {
      stopLoading();
    }
  };

  const createPaymentIntent = async (
    amount: number,
    accessToken: string
  ): Promise<PaymentIntentResponse> => {
    try {
      startLoading();
      const response = await authAxios.post<PaymentIntentResponse>(
        "/stripe/create-payment-intent",
        { amount },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("Create Payment Intent response:", response.data);
      return response.data;
    } catch (error: any) {
      console.error("Create Payment Intent error:", error);
      throw error.response
        ? error.response.data
        : ({ message: "Unknown error" } as AuthError);
    } finally {
      stopLoading();
    }
  };

  return { loginUser, registerUser, createPaymentIntent };
};

export default useAPI;
