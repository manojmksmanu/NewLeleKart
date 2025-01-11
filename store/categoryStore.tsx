import { create } from "zustand";
import { Category } from "@/types"; // Adjust the import path as needed

interface StoreState {
  categories: Category[];
  selectedCategory: Category | null;
  storeLoading: boolean;

  setCategories: (categories: Category[]) => void;
  setSelectedCategory: (selectedCategory: Category | null) => void;
  setStoreLoading: (loading: boolean) => void;
}

const useCategoryStore = create<StoreState>((set) => ({
  categories: [],
  selectedCategory: null,
  storeLoading: false,

  // Set Categories
  setCategories: (categories) => set({ categories }),

  // Set Selected Category
  setSelectedCategory: (selectedCategory) => set({ selectedCategory }),

  // Set Loading State
  setStoreLoading: (storeLoading) => set({ storeLoading }),
}));

export default useCategoryStore;
