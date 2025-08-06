import axios from "axios";
import { Profile } from "@/types/profile";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://localhost:3443";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchSession = async () => {
  try {
    const response = await api.get(`${API_URL}/salon-profile`);
    return {
      id: response.data.profile.salonId,
      email: response.data.email,
      profile: response.data.profile,
    };
  } catch (error) {
    console.error("Error fetching session:", error);
    throw error;
  }
};

export const fetchProfile = async () => {
  try {
    const response = await api.get(`${API_URL}/salon-profile`);
    return response.data.profile;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const response = await api.post(`${API_URL}/auth/login`, {
      email,
      password,
      role: "salon",
    });
    return response.data;
  } catch (error: any) {
    console.error("Error signing in:", error);
    throw new Error(error.response?.data?.message || "Đăng nhập thất bại");
  }
};

export const signUp = async (email: string, password: string, fullName?: string) => {
  try {
    const response = await api.post(`${API_URL}/auth/register`, {
      email,
      password,
      role: "salon",
    });
    return response.data;
  } catch (error: any) {
    console.error("Error signing up:", error);
    throw new Error(error.response?.data?.message || "Đăng ký thất bại");
  }
};

export const signOut = async () => {
  try {
    await api.post(`${API_URL}/auth/logout`);
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};

export const updateProfile = async (updates: Partial<Profile>) => {
  try {
    const response = await api.put(`${API_URL}/salon-profile`, updates);
    return response.data.profile;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};