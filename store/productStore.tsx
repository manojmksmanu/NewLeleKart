import { create } from "zustand";
import axios from "axios";

interface Category {
  id: number;
  name: string;
  slug: string;
  image?: string; // Make image optional
}

interface Product {
  id: number;
  name: string;
  price: string;
  category: string;
}

interface StoreState {
  categories: Category[];
  productsByCategory: Product[];
  storeLoading: boolean;

  setCategories: (categories: Category[]) => void;
  setProductsByCategory: (productsByCategory: Product[]) => void;
  fetchCategories: (queryParams?: Record<string, any>) => Promise<void>;
  fetchProducts: (queryParams?: Record<string, any>) => Promise<void>;
}

const api = axios.create({
  baseURL: "http://192.168.31.240:3000",
});

const useProductStore = create<StoreState>((set) => ({
  categories: [],
  productsByCategory: [],
  storeLoading: false,

  // Set Categories
  setCategories: (categories) => set({ categories }),

  // Set Products
  setProductsByCategory: (productsByCategory) => set({ productsByCategory }),

  // Fetch Categories
  fetchCategories: async (queryParams = {}) => {
    console.log("hit this");
    set({ storeLoading: true });
    try {
      const response = await api.get("/categories", {
        params: queryParams,
      });
      set({ categories: response.data, storeLoading: false });
    } catch (error: any) {
      console.error("Failed to fetch categories:", error.message);
      set({ storeLoading: false });
    }
  },

  // Fetch Products
  fetchProducts: async (queryParams = {}) => {
    set({ storeLoading: true });
    try {
      const response = await api.get("/products", { params: queryParams });
      set({ productsByCategory: response.data, storeLoading: false });
    } catch (error) {
      console.error("Failed to fetch products:", error);
      set({ storeLoading: false });
    }
  },
}));

export default useProductStore;
