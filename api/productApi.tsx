import axios from "axios";

import { api } from "@/utils/config";

export const fetchProducts = async (queryParams = {}) => {
  try {
    const response = await api.get("/products", { params: queryParams });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }
};
