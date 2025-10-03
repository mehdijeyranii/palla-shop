import React from "react";
import CartItemList from "./CartItemList";
import CartHeader from "./CartHeader";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "@/store/cartStore";
import { useUIStore } from "@/store/uiStore";

const SHIPPING_COST = 158000;

const CartDropdown: React.FC = () => {
  const { items, clearCart, totalPrice } = useCartStore();

  const setActiveOverlay = useUIStore((state) => state.setActiveOverlay);
  const navigate = useNavigate();

  const handleViewCart = () => {
    setActiveOverlay(null);
    navigate("/cart");
  };

  const totalItemsPrice = totalPrice;
  const totalWithShipping = totalItemsPrice + SHIPPING_COST;

  const formatPrice = (price: number): string => {
    return price.toLocaleString("fa-IR");
  };

  if (items.length === 0) {
    return (
      <div
        className="absolute left-0 top-full bg-white border border-zinc-200 rounded-lg shadow-lg mt-2 w-80 md:w-96 z-50 p-6 text-center text-zinc-500 text-sm"
        role="alert"
        aria-label="سبد خرید خالی است"
      >
        سبد خرید شما خالی است.
      </div>
    );
  }

  return (
    <div
      className="absolute left-0 top-full bg-white border border-zinc-200 rounded-lg shadow-lg mt-2 w-80 md:w-96 z-50"
      role="dialog"
      aria-modal="true"
      aria-label="محتوای سبد خرید"
    >
      <CartHeader />
      <CartItemList items={items} />
      <div className="p-2 border-t border-zinc-300 flex flex-col gap-2">
        <div className="flex flex-col text-xs gap-2 mb-2 text-zinc-500 p-4 border border-zinc-300 rounded-md">
          <p className="flex justify-between items-center">
            <span className="font-semibold text-sm">قیمت کل:</span>
            <span className="text-[10px]">
              <strong className="text-sm mx-1">
                {formatPrice(totalItemsPrice)}
              </strong>{" "}
              تومان
            </span>
          </p>
          <p className="flex justify-between items-center">
            <span className="font-semibold text-sm">هزینه حمل و نقل:</span>
            <span className="text-[10px]">
              <strong className="text-sm mx-1">
                {formatPrice(SHIPPING_COST)}
              </strong>{" "}
              تومان
            </span>
          </p>
          <hr className="border-zinc-300 my-0.5" />
          <p className="text-green-600 flex justify-between items-center">
            <span className="font-semibold text-sm">جمع کل:</span>
            <span className="text-[10px]">
              <strong className="text-sm mx-1">
                {formatPrice(totalWithShipping)}
              </strong>{" "}
              تومان
            </span>
          </p>
        </div>
        <button
          type="button"
          onClick={handleViewCart}
          className="w-full bg-sky-600 text-white py-2 rounded hover:bg-sky-700 transition cursor-pointer text-sm text-center"
        >
          مشاهده سبد خرید
        </button>
        <button
          className="w-full bg-white text-rose-600 py-2 rounded-lg hover:text-rose-700 transition cursor-pointer text-sm"
          onClick={clearCart}
        >
          خالی کن
        </button>
      </div>
    </div>
  );
};

export default CartDropdown;
