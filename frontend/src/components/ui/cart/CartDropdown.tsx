import { useCartStore } from "@/store/cartStore";
import React from "react";
import CartHeader from "./CartHeader";
import CartItemList from "./CartItemList";
import CartFooter from "./CartFooter";

const CartDropdown: React.FC = () => {
  const { items } = useCartStore();

  if (items.length === 0) {
    return (
      <div
        className="absolute left-0 top-full bg-white border border-zinc-200 rounded-lg shadow-lg mt-2 w-80 md:w-96 z-50 p-6 text-center text-zinc-500 text-sm"
        role="alert"
        aria-label="سبد خرید خالی است"
      >
        سبد خرید شما خالی است
      </div>
    );
  }
  return (
    <div
      className="absolute left-0 top-full bg-white border border-zinc-200 rounded-lg shadow-lg mt-2 w-80 md:w-96 z-50"
      role="region"
      aria-label="سبد خرید کوچک"
    >
      <CartHeader />
      <CartItemList items={items} />
      <CartFooter />
    </div>
  );
};

export default CartDropdown;
