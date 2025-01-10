import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "@/utils/config";

type AuthState = {
  token: string | null;
  user: any | null;
  isLoading: boolean;
  userLoading: boolean;
  error: string | null;
  login: (username: string, password: string, showToast: any) => Promise<void>;
  register: (
    username: string,
    password: string,
    email: string,
    showToast: any
  ) => Promise<void>;
  fetchUser: () => Promise<void>;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      isLoading: false,
      userLoading: false,
      error: null,

      // Login function
      login: async (username, password, showToast) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.post("/auth/login", {
            username,
            password,
          });
          const { token, user } = response.data;
          console.log("Token after login:", token); // Debug log
          console.log("User after login:", user); // Debug log

          if (token) {
            set({ token, user, isLoading: false });
            showToast("Login successful", "success", 2000);

            // Automatically fetch user data after login
            await get().fetchUser();
          } else {
            set({ error: "Login failed", isLoading: false });
            showToast("Login failed", "error", 2000);
          }
        } catch (error: any) {
          set({
            error: error.response?.data?.message || "Login failed",
            isLoading: false,
          });
          showToast(
            error.response?.data?.message || "Login failed",
            "error",
            2000
          );
        }
      },

      // Register function
      register: async (username, password, email, showToast) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.post("/auth/register", {
            username,
            password,
            email,
          });
          const { message, error } = response.data;

          if (message && !error) {
            set({ isLoading: false });
            showToast(message, "success", 2000);
          } else if (error) {
            set({ error: error.message, isLoading: false });
            showToast(error.message, "error", 2000);
          } else {
            set({ error: "Registration failed", isLoading: false });
            showToast("Registration failed", "error", 2000);
          }
        } catch (error: any) {
          set({
            error: error.response?.data?.message || "Registration failed",
            isLoading: false,
          });
          showToast(
            error.response?.data?.message || "Registration failed",
            "error",
            2000
          );
        }
      },

      // Fetch user data function
      fetchUser: async () => {
        const { token } = get();
        console.log("Token in fetchUser:", token); // Debug log
        if (!token) return;

        set({ userLoading: true, error: null });
        try {
          const response = await api.get("/auth/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          const userData = response.data.customerData; // The data you provided
          console.log("Fetched User Data:", userData); // Debug log

          if (userData) {
            set({ user: userData, userLoading: false });
          } else {
            set({ error: "Failed to fetch user data", userLoading: false });
          }
        } catch (error: any) {
          set({
            error: error.response?.data?.message || "Failed to fetch user data",
            userLoading: false,
          });
        }
      },

      // Logout function
      logout: () => {
        set({ token: null, user: null });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
