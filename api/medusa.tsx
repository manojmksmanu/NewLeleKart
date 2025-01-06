// axiosInstance.ts
import axios from "axios";

const MEDUSA_BACKEND_URL = "https://admin.lelehaat.com"; // Replace with your Medusa server URL
const MEDUSA_API_KEY =
  "pk_538a0b9c964e74ff9e0ca79f8f72afab30a84a9f27e3e4a9da5fb7c6cafe112d"; // Replace with your Medusa API key

const axiosInstance = axios.create({
  baseURL: MEDUSA_BACKEND_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "x-publishable-api-key": MEDUSA_API_KEY,
  },
});

// Fetch list of products
export const fetchProducts = async () => {
  try {
    const response = await axios.get(
      `https://admin.lelehaat.com/store/products`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-publishable-api-key":
            "pk_538a0b9c964e74ff9e0ca79f8f72afab30a84a9f27e3e4a9da5fb7c6cafe112d",
        },
      }
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data || error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    return []; // Return empty array in case of error
  }
};

// Fetch a specific product by ID
export const fetchProductById = async (productId: string): Promise<any> => {
  try {
    const response = await axiosInstance.get(`/store/products/${productId}`);
    return response.data; // Return product details
  } catch (error) {
    console.error("Error fetching product:", error);
  }
};

// Fetch variant prices for a product
export const fetchProductVariants = async (
  productId: string
): Promise<any[]> => {
  try {
    const response = await axiosInstance.get(
      `/store/products/${productId}/variants`
    );
    return response.data.variants; // Return product variants with prices
  } catch (error) {
    console.error("Error fetching product variants:", error);
    return [];
  }
};

// Fetch inventory for a specific variant
export const fetchVariantInventory = async (
  variantId: string
): Promise<number> => {
  try {
    const response = await axiosInstance.get(`/store/variants/${variantId}`);
    return response.data.variant.inventory_quantity; // Return variant inventory
  } catch (error) {
    console.error("Error fetching variant inventory:", error);
    return 0;
  }
};

// Fetch user's cart (if logged in)
export const fetchUserCart = async (userId: string): Promise<any> => {
  try {
    const response = await axiosInstance.get(`/store/carts?user_id=${userId}`);
    return response.data; // Return user's cart
  } catch (error) {
    console.error("Error fetching user cart:", error);
    return { items: [] };
  }
};
