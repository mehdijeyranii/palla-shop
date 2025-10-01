// src/pages/CartPage.tsx

import { useCartStore } from "@/store/cartStore";
import { Link } from "react-router-dom";
import { Trash2, Plus, Minus } from "lucide-react";

const CartPage = () => {
  const { items, totalPrice, removeFromCart, updateQuantity } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="container mx-auto py-12 text-center">
        <h1 className="text-2xl font-bold text-zinc-800 mb-4">
          سبد خرید شما خالی است
        </h1>
        <Link
          to="/"
          className="inline-block bg-sky-600 hover:bg-sky-700 text-white px-6 py-2 rounded-md transition-colors"
        >
          بازگشت به فروشگاه
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold text-zinc-800 mb-6">سبد خرید</h1>

      <div className="bg-white rounded-lg border border-zinc-200 overflow-hidden">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center p-4 border-b border-zinc-100 last:border-0"
          >
            <div className="flex-1">
              <h3 className="font-medium text-zinc-800">{item.name}</h3>
              <p className="text-sm text-zinc-500 mt-1">
                {item.price.toLocaleString()} تومان
              </p>
            </div>

            {/* کنترل تعداد */}
            <div className="flex items-center gap-2 ml-4">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="size-8 rounded-full border border-zinc-300 flex items-center justify-center hover:bg-zinc-100"
                aria-label="کاهش تعداد"
              >
                <Minus size={14} />
              </button>
              <span className="w-8 text-center font-medium">
                {item.quantity}
              </span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="size-8 rounded-full border border-zinc-300 flex items-center justify-center hover:bg-zinc-100"
                aria-label="افزایش تعداد"
              >
                <Plus size={14} />
              </button>
            </div>

            {/* حذف */}
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-zinc-500 hover:text-rose-500 p-2"
              aria-label="حذف از سبد خرید"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>

      {/* خلاصه سبد */}
      <div className="mt-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="text-lg font-bold text-zinc-800">
          مجموع: {totalPrice.toLocaleString()} تومان
        </div>
        <div className="flex gap-3">
          <Link
            to="/"
            className="px-4 py-2 border border-zinc-300 rounded-md text-zinc-700 hover:bg-zinc-50"
          >
            ادامه خرید
          </Link>
          <button className="px-6 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-md transition-colors">
            ثبت سفارش
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
