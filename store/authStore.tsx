import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import { api } from "@/utils/config"; // Import the axios instance

// Define the shape of the authentication state
type AuthState = {
  token: string | null; // JWT token
  user: any | null; // User data
  isLoading: boolean; // Loading state
  error: string | null; // Error message
  login: (
    username: string,
    password: string,
    showToast: any,
  ) => Promise<void>; // Login function with showToast
  register: (
    username: string,
    password: string,
    email: string,
    showToast: any,
  ) => Promise<void>; // Register function with showToast
  fetchUser: () => Promise<void>; // Fetch user data function
  logout: () => void; // Logout function
};

// Create the Zustand store with AsyncStorage persistence
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null, // Initial token state
      user: null, // Initial user state
      isLoading: false, // Initial loading state
      error: null, // Initial error state

      // Login function with showToast
      login: async (username, password, showToast) => {
        set({ isLoading: true, error: null }); // Set loading state
        try {
          const response = await api.post("/auth/login", {
            username,
            password,
          }); // Use axios
          const { token, user } = response.data;

          if (token) {
            set({ token, user, isLoading: false }); // Update state on success
            showToast("Login successful", "success", 2000); // Show success toast
          } else {
            set({ error: "Login failed", isLoading: false }); // Update state on error
            showToast("Login failed", "error", 2000); // Show error toast
          }
        } catch (error:any) {
          set({
            error: error.response?.data?.message || "Login failed",
            isLoading: false,
          }); // Handle errors
          showToast(
            error.response?.data?.message || "Login failed",
            "error",
            2000
          ); // Show error toast
        }
      },

      // Register function with showToast
      register: async (username, password, email, showToast) => {
        set({ isLoading: true, error: null }); // Set loading state
        try {
          const response = await api.post("/auth/register", {
            username,
            password,
            email,
          }); // Use axios
          const { message } = response.data;

          if (message) {
            set({ isLoading: false }); // Update state on success
            showToast("Registration successful", "success", 2000); // Show success toast
          } else {
            set({ error: "Registration failed", isLoading: false }); // Update state on error
            showToast("Registration failed", "error", 2000); // Show error toast
          }
        } catch (error:any) {
          set({
            error: error.response?.data?.message || "Registration failed",
            isLoading: false,
          }); // Handle errors
          showToast(
            error.response?.data?.message || "Registration failed",
            "error",
            2000
          ); // Show error toast
        }
      },

      // Fetch user data function
      fetchUser: async () => {
        const { token } = get(); // Get the current token
        if (!token) return; // Exit if no token

        set({ isLoading: true, error: null }); // Set loading state
        try {
          const response = await api.get("/auth/me", {
            headers: { Authorization: `Bearer ${token}` }, // Use axios with token
          });
          const { user } = response.data;

          if (user) {
            set({ user, isLoading: false }); // Update state on success
          } else {
            set({ error: "Failed to fetch user data", isLoading: false }); // Update state on error
          }
        } catch (error:any) {
          set({
            error: error.response?.data?.message || "Failed to fetch user data",
            isLoading: false,
          }); // Handle errors
        }
      },

      // Logout function
      logout: () => {
        set({ token: null, user: null }); // Clear token and user data
      },
    }),
    {
      name: "auth-storage", // Local storage key
      storage: createJSONStorage(() => AsyncStorage), // Use AsyncStorage for persistence
    }
  )
);
