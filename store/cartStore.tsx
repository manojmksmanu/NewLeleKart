import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useAuthStore } from "@/store/authStore"; // Import your auth store
import { useToast } from "@/context/ToastContainer"; // Import your toast context
import { baseURL } from "@/utils/config";

interface CartItem {
  product_id: number;
  quantity: number;
  image: string; // Product image URL
  name: string; // Product name
  price: number; // Product price
  item_key: string; // Unique key for the cart item
}

interface CartState {
  cart: CartItem[];
  loading: boolean; // Add loading state
  addToCart: (item: CartItem, token: string, showToast: any) => Promise<void>;
  updateQuantity: (
    item_key: string,
    quantity: number,
    token: string,
    showToast: any
  ) => Promise<void>;
  removeFromCart: (
    item_key: string,
    token: string,
    showToast: any
  ) => Promise<void>;
  clearCart: (token: string, showToast: any) => Promise<void>;
  getTotalItems: () => number;
  getSubtotal: () => number;
  isInCart: (item_key: string) => boolean;
  syncCartWithServer: (
    token: string,
    showToast: any
  ) => Promise<{
    totalProducts: number;
    totalPrice: number;
  }>;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      loading: false, // Initialize loading state

      // Add to cart (local and server)
      addToCart: async (item, token, showToast) => {
        console.log("Adding item to cart:", item);

        const { cart, syncCartWithServer } = get();

        set({ loading: true }); // Start loading
        console.log("Loading state set to true");

        try {
          // Add to local cart
          const existingItem = cart.find(
            (i) => i.product_id === item.product_id
          );

          if (existingItem) {
            console.log("Item already exists in cart, updating quantity");
            set({
              cart: cart.map((i) =>
                i.product_id === item.product_id
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            });
          } else {
            console.log("Item not in cart, adding new item");
            set({ cart: [...cart, item] });
          }

          console.log("Local cart updated");

          // If token is available, sync with server
          if (token) {
            // Prepare the payload in the required format
            const payload = [
              {
                product_id: String(item.product_id), // Ensure product_id is a string
                quantity: String(item.quantity), // Ensure quantity is a string
              },
            ];

            // Log the API request details
            console.log(
              "Sending request to:",
              `${baseURL}/customers/cart/add-item`
            );
            console.log("Request payload:", payload);
            console.log("Request headers:", {
              Authorization: `Bearer ${token}`,
            });

            // Sync with server
            const response = await axios.post(
              `${baseURL}/customers/cart/add-item`,
              payload, // Send the array as the payload
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            console.log("API response:", response.data);

            await syncCartWithServer(token, showToast); // Sync local cart with server after adding
          }

          showToast("Product added to cart!", "success", 2000); // Show success toast
        } catch (error: any) {
          console.error("Failed to add item to server cart:", error.message);
          console.error(
            "Error details:",
            error.response?.data || error.message
          );
          showToast("Failed to add product to cart.", "error", 2000); // Show error toast
        } finally {
          set({ loading: false }); // Stop loading
          console.log("Loading state set to false");
        }
      },

      // Update quantity (local and server)
      updateQuantity: async (item_key, quantity, token, showToast) => {
        const { cart, syncCartWithServer } = get();

        set({ loading: true }); // Start loading

        try {
          // Update local cart
          set({
            cart: cart.map((item) =>
              item.item_key === item_key ? { ...item, quantity } : item
            ),
          });

          // If token is available, sync with server
          if (token) {
            await axios.post(
              `${baseURL}/customers/cart/item/${item_key}`,
              {
                quantity: String(quantity),
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            await syncCartWithServer(token, showToast); // Sync local cart with server after updating
          }

          showToast("Quantity updated successfully!", "success", 2000); // Show success toast
        } catch (error) {
          console.error("Failed to update item in server cart:", error);
          showToast("Failed to update quantity.", "error", 2000); // Show error toast
        } finally {
          set({ loading: false }); // Stop loading
        }
      },

      // Remove from cart (local and server)
      removeFromCart: async (item_key, token, showToast) => {
        const { cart, syncCartWithServer } = get();

        set({ loading: true }); // Start loading

        try {
          // Remove from local cart
          set({
            cart: cart.filter((item) => item.item_key !== item_key),
          });

          // If token is available, sync with server
          if (token) {
            await axios.delete(`${baseURL}/customers/cart/item/${item_key}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            await syncCartWithServer(token, showToast); // Sync local cart with server after removing
          }

          showToast("Product removed from cart!", "success", 2000); // Show success toast
        } catch (error) {
          console.error("Failed to remove item from server cart:", error);
          showToast("Failed to remove product from cart.", "error", 2000); // Show error toast
        } finally {
          set({ loading: false }); // Stop loading
        }
      },

      // Clear cart (local and server)
      clearCart: async (token, showToast) => {
        set({ loading: true }); // Start loading

        try {
          // Clear local cart
          set({ cart: [] });

          // If token is available, sync with server
          if (token) {
            await axios.delete(`${baseURL}/customers/cart`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
          }

          showToast("Cart cleared successfully!", "success", 2000); // Show success toast
        } catch (error) {
          console.error("Failed to clear server cart:", error);
          showToast("Failed to clear cart.", "error", 2000); // Show error toast
        } finally {
          set({ loading: false }); // Stop loading
        }
      },

      // Get total number of items in the cart
      getTotalItems: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.quantity, 0);
      },

      // Calculate subtotal
      getSubtotal: () => {
        const { cart } = get();
        return cart.reduce(
          (total, item) => total + item.quantity * (item.price || 0),
          0
        );
      },

      // Check if a product is in the cart
      isInCart: (item_key) => {
        const { cart } = get();
        return cart.some((item) => item.item_key === item_key);
      },

      // Sync local cart with server
      syncCartWithServer: async (token, showToast) => {
        if (!token) {
          console.log("No token available, skipping server sync.");
          return { totalProducts: 0, totalPrice: 0 }; // Return default values if no token
        }

        set({ loading: true }); // Start loading

        try {
          const response = await axios.get(`${baseURL}/customers/cart`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const serverCart = response.data;

          // Map server cart data to local cart format
          const localCart = serverCart.items.map((item: any) => ({
            product_id: item.id, // Use `id` from the server response
            quantity: item.quantity.value, // Use `quantity.value` from the server response
            image: item.featured_image, // Use `featured_image` from the server response
            name: item.name, // Use `name` from the server response
            price: parseFloat(item.price), // Use `price` from the server response
            item_key: item.item_key, // Use `item_key` from the server response
          }));

          // Calculate total number of products
          const totalProducts = serverCart.item_count; // Use `item_count` from the server response

          // Calculate total price
          const totalPrice = parseFloat(serverCart.totals.total); // Use `totals.total` from the server response

          // Update local cart with server data
          set({ cart: localCart });

          // Return total products and total price
          return { totalProducts, totalPrice };
        } catch (error) {
          console.error("Failed to sync cart with server:", error);
          showToast("Failed to sync cart with server.", "error", 2000); // Show error toast
          return { totalProducts: 0, totalPrice: 0 }; // Return default values on error
        } finally {
          set({ loading: false }); // Stop loading
        }
      },
    }),
    {
      name: "cart-storage", // Local storage key
      storage: createJSONStorage(() => AsyncStorage), // Use AsyncStorage for persistence
    }
  )
);
