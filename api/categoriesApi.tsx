import { api } from "@/utils/config";

interface Category {
  id: number;
  name: string;
  slug: string;
  image?: { src: string };
}

// Fetch all categories
export const fetchCategories = async (queryParams?: Record<string, any>) => {
  try {
    const response = await api.get("/categories", { params: queryParams });
    return response.data.data; // Return the fetched data
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    throw error; // Re-throw the error for handling in the component
  }
};

// Fetch a category by ID
export const fetchCategoryById = async (id: number) => {
  try {
    const response = await api.get(`/categories/${id}`);
    return response.data; // Return the fetched data
  } catch (error) {
    console.error("Failed to fetch category:", error);
    throw error; // Re-throw the error for handling in the component
  }
};
