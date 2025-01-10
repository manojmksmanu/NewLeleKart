import axios from "axios";

import { api } from "@/utils/config";

export const fetchProducts = async (queryParams = {}) => {
  console.log(queryParams)
  try {
    const response = await api.get("/products", { params: queryParams });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }
};

export const getSubcategories = async (id: any) => {
  console.log(id,'id')
  try {
    const response = await api.get(`/categories/${id}/subcategories`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }
};
