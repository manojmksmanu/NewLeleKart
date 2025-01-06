import { create } from "zustand";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthStore {
  isAuthenticated: boolean;
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  setAuthFromLocalStorage: () => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  user: null,
  // Initialize auth state from localStorage
  setAuthFromLocalStorage: () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser: User = JSON.parse(storedUser);
      set({ isAuthenticated: true, user: parsedUser });
    }
  },
  login: (userData: User) => {
    localStorage.setItem("user", JSON.stringify(userData)); // Save user data to localStorage
    set({ isAuthenticated: true, user: userData });
  },
  logout: () => {
    localStorage.removeItem("user"); // Remove user data from localStorage
    set({ isAuthenticated: false, user: null });
  },
}));

export default useAuthStore;
