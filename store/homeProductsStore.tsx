import { create } from "zustand";
import { api } from "@/utils/config";

interface Product {
  id: number;
  name: string;
  slug: string;
  price: string;
  regular_price: string;
  sale_price: string;
  description: string;
  short_description: string;
  images: { src: string }[];
  categories: { id: number; name: string; slug: string }[];
}

interface HomeProductState {
  exploreProducts: Product[];
  clearanceProducts: Product[];
  hotDealsProducts: Product[];
  homeProductsLoading: boolean;

  setExploreProducts: (products: Product[]) => void;
  setClearanceProducts: (products: Product[]) => void;
  setHotDealsProducts: (products: Product[]) => void;

  fetchExploreProducts: () => Promise<void>;
  fetchClearanceProducts: () => Promise<void>;
  fetchHotDealsProducts: () => Promise<void>;
}

const useHomeProductStore = create<HomeProductState>((set) => ({
  exploreProducts: [],
  clearanceProducts: [],
  hotDealsProducts: [],
  homeProductsLoading: false,

  // Set Explore Products
  setExploreProducts: (exploreProducts) => set({ exploreProducts }),

  // Set Clearance Products
  setClearanceProducts: (clearanceProducts) => set({ clearanceProducts }),

  // Set Hot Deals Products
  setHotDealsProducts: (hotDealsProducts) => set({ hotDealsProducts }),

  // Fetch Explore Products
  fetchExploreProducts: async () => {
    set({ homeProductsLoading: true });
    try {
      const response = await api.get("/products/explore");
      set({ exploreProducts: response.data, homeProductsLoading: false });
    } catch (error: any) {
      console.error("Failed to fetch explore products:", error.message);
      set({ homeProductsLoading: false });
    }
  },

  // Fetch Clearance Products
  fetchClearanceProducts: async () => {
    set({ homeProductsLoading: true });
    try {
      const response = await api.get("/products/clearance");
      set({ clearanceProducts: response.data, homeProductsLoading: false });
    } catch (error: any) {
      console.error("Failed to fetch clearance products:", error.message);
      set({ homeProductsLoading: false });
    }
  },

  // Fetch Hot Deals Products
  fetchHotDealsProducts: async () => {
    set({ homeProductsLoading: true });
    try {
      const response = await api.get("/products/hot-deals");
      set({ hotDealsProducts: response.data, homeProductsLoading: false });
    } catch (error: any) {
      console.error("Failed to fetch hot deals products:", error.message);
      set({ homeProductsLoading: false });
    }
  },
}));

export default useHomeProductStore;
