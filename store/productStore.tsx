import { create } from "zustand";
import axios from "axios";
import { api } from "@/utils/config";
interface Category {
  id: number;
  name: string;
  slug: string;
  image?: { src: string }; // Define image as an object with a src property
}

interface Product {
  id: number;
  name: string;
  price: string;
  category: string;
  images:string;
}

interface StoreState {
  categories: Category[];
  productsByCategory: Product[];
  selectedCategory: any; // Add selectedCategory state
  storeLoading: boolean;

  setCategories: (categories: Category[]) => void;
  setProductsByCategory: (productsByCategory: Product[]) => void;
  setSelectedCategory: (selectedCategory: Category | null) => void; // Add setSelectedCategory
  fetchCategories: (queryParams?: Record<string, any>) => Promise<void>;
  fetchProducts: (queryParams?: Record<string, any>) => Promise<void>;
  fetchCategoryById: (categoryId: any) => Promise<void>; // Add fetchCategoryById
}

const useProductStore = create<StoreState>((set) => ({
  categories: [],
  productsByCategory: [],
  selectedCategory: null, // Initialize selectedCategory
  storeLoading: false,

  // Set Categories
  setCategories: (categories) => set({ categories }),

  // Set Products
  setProductsByCategory: (productsByCategory) => set({ productsByCategory }),

  // Set Selected Category
  setSelectedCategory: (selectedCategory) => set({ selectedCategory }),

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

  // Fetch Category by ID
  fetchCategoryById: async (id: number) => {
    set({ storeLoading: true });
    try {
      const response = await api.get(`/categories/${id}`);
      set({ selectedCategory: response.data, storeLoading: false });
    } catch (error) {
      console.error("Failed to fetch category:", error);
      set({ storeLoading: false });
    }
  },
}));

export default useProductStore;