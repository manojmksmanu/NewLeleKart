import create from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
  variantId: string;
  title: string;
  variantTitle: string;
  price: number;
}

interface CartStore {
  cartItems: CartItem[];
  addToCart: (product: CartItem) => void;
  removeFromCart: (variantId: string) => void;
  clearCart: () => void;
  setCartFromServer: (cart: CartItem[]) => void;
}

// Updated persist middleware typing to match with zustand store
const useCartStore = create<CartStore>(
  persist(
    (set) => ({
      cartItems: [],
      addToCart: (product: CartItem) =>
        set((state) => {
          const existingProductIndex = state.cartItems.findIndex(
            (item) => item.variantId === product.variantId
          );
          if (existingProductIndex >= 0) {
            const updatedCartItems = [...state.cartItems];
            updatedCartItems[existingProductIndex] = product;
            return { cartItems: updatedCartItems };
          } else {
            return { cartItems: [...state.cartItems, product] };
          }
        }),
      removeFromCart: (variantId: string) =>
        set((state) => ({
          cartItems: state.cartItems.filter(
            (item) => item.variantId !== variantId
          ),
        })),
      clearCart: () => set({ cartItems: [] }),
      setCartFromServer: (cart: CartItem[]) => set({ cartItems: cart }),
    }),
    {
      name: "cart-storage", // Store name in local storage
      getStorage: () => localStorage, // Use appropriate storage for your environment
    }
  )
);

export default useCartStore;
