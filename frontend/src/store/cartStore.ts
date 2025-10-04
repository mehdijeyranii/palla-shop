import type { CartItem } from "@/utils/mockApi";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;

  addToCart: (product: CartItem) => void;
  removeFromCart: (productId: string | number) => void;
  updateQuantity: (productId: string | number, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,

      addToCart: (product) => {
        const { items } = get();
        const existingItem = items.find((item) => item.id === product.id);

        let newItems;
        if (existingItem) {
          newItems = items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + product.quantity }
              : item
          );
        } else {
          newItems = [...items, product];
        }

        const totalItems = newItems.reduce(
          (sum, item) => sum + item.quantity,
          0
        );
        const totalPrice = newItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );

        set({ items: newItems, totalItems, totalPrice });
      },

      removeFromCart: (productId) => {
        const { items } = get();
        const newItems = items.filter((item) => item.id !== productId);
        const totalItems = newItems.reduce(
          (sum, item) => sum + item.quantity,
          0
        );
        const totalPrice = newItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );

        set({ items: newItems, totalItems, totalPrice });
      },

      updateQuantity: (productId, quantity) => {
        if (quantity < 1) return;
        const { items } = get();
        const newItems = items.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        );

        const totalItems = newItems.reduce(
          (sum, item) => sum + item.quantity,
          0
        );
        const totalPrice = newItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );

        set({ items: newItems, totalItems, totalPrice });
      },

      clearCart: () => {
        set({ items: [], totalItems: 0, totalPrice: 0 });
      },
    }),
    {
      name: "cart-storage",
    }
  )
);
