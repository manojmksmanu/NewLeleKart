// store/cartStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface CartItem {
  product_id: number;
  variation_id?: number;
  quantity: number;
  image: string; // Product image URL
  name: string; // Product name
  attributes: { name: string; option: string }[]; // Variant attributes
}

interface CartState {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  updateQuantity: (
    product_id: number,
    variation_id: number | undefined,
    quantity: number
  ) => void;
  removeFromCart: (
    product_id: number,
    variation_id: number | undefined
  ) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getSubtotal: () => number;
  isInCart: (product_id: number, variation_id?: number) => boolean;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],

      // Add to cart
      addToCart: (item) => {
        const { cart } = get();
        const existingItem = cart.find(
          (i) =>
            i.product_id === item.product_id &&
            i.variation_id === item.variation_id
        );

        if (existingItem) {
          // If item already exists, update quantity
          set({
            cart: cart.map((i) =>
              i.product_id === item.product_id &&
              i.variation_id === item.variation_id
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            ),
          });
        } else {
          // If item doesn't exist, add it to the cart
          set({ cart: [...cart, item] });
        }
      },

      // Update quantity
      updateQuantity: (product_id, variation_id, quantity) => {
        const { cart } = get();
        set({
          cart: cart.map((item) =>
            item.product_id === product_id && item.variation_id === variation_id
              ? { ...item, quantity }
              : item
          ),
        });
      },

      // Remove from cart
      removeFromCart: (product_id, variation_id) => {
        const { cart } = get();
        set({
          cart: cart.filter(
            (item) =>
              !(
                item.product_id === product_id &&
                item.variation_id === variation_id
              )
          ),
        });
      },

      // Clear cart
      clearCart: () => set({ cart: [] }),

      // Get total number of items in the cart
      getTotalItems: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.quantity, 0);
      },

      // Calculate subtotal
      getSubtotal: () => {
        const { cart } = get();
        // Replace this with actual product prices from your API
        return cart.reduce((total, item) => total + item.quantity * 10, 0); // Example: $10 per item
      },

      // Check if a product/variant is in the cart
      isInCart: (product_id, variation_id) => {
        const { cart } = get();
        return cart.some(
          (item) =>
            item.product_id === product_id && item.variation_id === variation_id
        );
      },
    }),
    {
      name: "cart-storage", // Local storage key
      storage: createJSONStorage(() => AsyncStorage), // Use AsyncStorage for persistence
    }
  )
);
