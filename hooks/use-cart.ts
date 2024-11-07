import { Product } from "@/lib/types";
import { toast } from "sonner";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface CartItem extends Product {
    quantity: number;
}

interface PreviewModalStore {
    items: CartItem[];
    addItem: (data: Product) => void;
    removeItem: (id: string) => void;
    increaseQuantity: (id: string) => void;
    decreaseQuantity: (id: string) => void;
    removeAll: () => void;
}

const useCart = create(
    persist<PreviewModalStore>(
        (set, get) => ({
            items: [],
            addItem: (data: Product) => {
                const currentItem = get().items;
                const existingItem = currentItem.find((item) => item.id === data.id);

                if (existingItem) {
                    return toast("Item already in cart");
                }

                // Set default quantity to 1 when adding a new item
                set({ items: [...get().items, { ...data, quantity: 1 }] });
                toast.success("Item added to cart");
            },
            removeItem: (id: string) => {
                set({ items: get().items.filter((item) => item.id !== id) });
                toast.success("Item removed from cart");
            },
            increaseQuantity: (id: string) => {
                const updatedItems = get().items.map((item) => {
                    if (item.id === id) {
                        // Only increase quantity if it's below the stock limit
                        if (item.quantity < item.stocks) {
                            return { ...item, quantity: item.quantity + 1 };
                        } else {
                            toast("No more stock available for this item");
                        }
                    }
                    return item;
                });
                set({ items: updatedItems });
            },
            decreaseQuantity: (id: string) => {
                const updatedItems = get().items.map((item) =>
                    item.id === id && item.quantity > 1
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                );
                set({ items: updatedItems });
                toast.success("Item quantity decreased");
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
