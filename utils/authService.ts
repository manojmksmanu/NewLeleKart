import { fetchUserCart } from "@/api/medusa";
import useCartStore from "../store/cartStore";

// Sync cart with the server (for logged-in users)
export const syncCartWithServer = async (
  userId: string,
  setCartFromServer: (cart: any[]) => void
) => {
  try {
    const cart = await fetchUserCart(userId); // Fetch cart from Medusa
    setCartFromServer(cart.items); // Update Zustand cart store
  } catch (error) {
    console.error("Error syncing cart with server:", error);
  }
};
