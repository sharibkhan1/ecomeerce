import { Product } from "@/lib/types";
import { toast } from "sonner";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface CartItem extends Omit<Product, 'size' | 'color'> {
  quantity: number;
  size?: { name?: string; value: string };  // Optional properties for size and color
  color?: { name?: string; value: string };
}

interface PreviewModalStore {
  items: CartItem[];
  addItem: (data: Product & { color: { value: string }; size: { value: string } }) => void;
  removeItem: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  removeAll: () => void;
}

const useCart = create(
  persist<PreviewModalStore>(
    (set, get) => ({
      items: [],
      addItem: (data) => {
        const currentItem = get().items;
        const existingItem = currentItem.find((item) => item.id === data.id && item.color?.value === data.color.value && item.size?.value === data.size.value);

        if (existingItem) {
          return toast("Item already in cart");
        }

        // Set default quantity to 1 and add selected color and size
        set({ items: [...get().items, { ...data, quantity: 1 }] });
        toast.success("Item added to cart");
      },
      removeItem: (id: string) => {
        set({ items: get().items.filter((item) => item.id !== id) });
        toast.success("Item removed from cart");
      },
      increaseQuantity: (id: string) => {
        const updatedItems = get().items.map((item) => {
          if (item.id === id && item.quantity < item.stocks) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
        set({ items: updatedItems });
      },
      decreaseQuantity: (id: string) => {
        const updatedItems = get().items.map((item) =>
          item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
        );
        set({ items: updatedItems });
      },
      removeAll: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
