import axios, { AxiosInstance } from "axios";
import { Product, Cart, CartItem } from "../types";

const BASE_URL = "YOUR_MEDUSA_API";

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const medusaApi = {
  getProducts: async (): Promise<Product[]> => {
    const response = await api.get<{ products: Product[] }>("/store/products");
    return response.data.products;
  },

  getProduct: async (productId: string): Promise<Product> => {
    const response = await api.get<{ product: Product }>(
      `/store/products/${productId}`
    );
    return response.data.product;
  },

  createCart: async (): Promise<Cart> => {
    const response = await api.post<{ cart: Cart }>("/store/carts");
    return response.data.cart;
  },

  addToCart: async (
    cartId: string,
    variantId: string,
    quantity: number
  ): Promise<Cart> => {
    const response = await api.post<{ cart: Cart }>(
      `/store/carts/${cartId}/line-items`,
      {
        variant_id: variantId,
        quantity,
      }
    );
    return response.data.cart;
  },

  syncCart: async (cartItems: CartItem[]): Promise<Cart> => {
    const response = await api.post<Cart>("/store/carts/sync", {
      items: cartItems,
    });
    return response.data;
  },
};
