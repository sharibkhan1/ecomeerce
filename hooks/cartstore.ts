import { create } from "zustand";

interface CartStore {
  cartCount: number;
  setCartCount: (count: number) => void;
}

export const useCartStore = create<CartStore>((set) => ({
  cartCount: 0, // Default value
  setCartCount: (count) => {
    // Check if we're in the browser before accessing localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem('cartCount', count.toString()); // Persist the count to localStorage
    }
    set({ cartCount: count });
  },
}));

// This will initialize the state after component mounts, on the client-side only.
if (typeof window !== "undefined") {
  const savedCount = Number(localStorage.getItem('cartCount')) || 0;
  useCartStore.getState().setCartCount(savedCount); // Set initial cartCount value
}
