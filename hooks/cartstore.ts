// store/cartStore.ts

import { create } from "zustand";

interface CartStore {
  cartCount: number;
  setCartCount: (count: number) => void;
}

export const useCartStore = create<CartStore>((set) => ({
  cartCount: 0,
  setCartCount: (count) => set({ cartCount: count }),
}));
