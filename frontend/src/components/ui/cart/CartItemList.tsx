import { useCartStore } from "@/store/cartStore";
import { Minus, Plus, Trash2 } from "lucide-react";
import React from "react";

interface CartItemListProps {
  items: {
    id: string | number;
    name: string;
    image: string;
    category: string;
    price: number;
    quantity: number;
    size?: string;
    color?: string;
    discount?: number;
    badge?: string;
  }[];
}

const CartItemList: React.FC<CartItemListProps> = ({ items }) => {
  const { removeFromCart, updateQuantity } = useCartStore();

  const handleQuantityChange = (id: string | number, change: number) => {
    const item = items.find((item) => item.id === id);
    if (!item) return;
    const newQuantity = item.quantity + change;
    if (newQuantity >= 1) {
      updateQuantity(id, newQuantity);
    }
  };

  return (
    <ul className="max-h-80 space-y-2 overflow-y-auto p-2 custom-scroll">
      {items.map((item, index) => (
        <li className="p-1" key={item.id}>
          <div className="flex items-start gap-4">
            <div className="w-20 aspect-square p-1 bg-zinc-200 rounded">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="w-full">
              <span className="text-[10px] text-zinc-400 font-semibold">
                {item.category}
              </span>
              <h4 className="font-bold text-zinc-800 text-sm line-clamp-1">
                {item.name}
              </h4>
              {(item.size || item.color) && (
                <div className="flex flex-col gap-0.5 mt-1">
                  {item.size && (
                    <span className="text-xs text-zinc-500">
                      سایز: {item.size}
                    </span>
                  )}
                  {item.color && (
                    <span className="text-xs text-zinc-500">
                      رنگ: {item.color}
                    </span>
                  )}
                </div>
              )}
              <div className="mt-2 flex items-center gap-1">
                {item.discount && (
                  <span className="text-xs text-rose-600 bg-rose-600/10 font-bold px-2 py-0.5 rounded">
                    %{item.discount}
                  </span>
                )}
                {item.badge && (
                  <span className="text-xs text-sky-600 bg-sky-600/10 font-bold px-2 py-0.5 rounded">
                    {item.badge}
                  </span>
                )}
              </div>
              <div className="mt-2 flex justify-between items-center">
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    className="grid place-content-center size-6 rounded border border-zinc-300 bg-white hover:bg-zinc-200 cursor-pointer"
                    aria-label="کاهش تعداد"
                    onClick={() => handleQuantityChange(item.id, -1)}
                  >
                    <Minus size={14} strokeWidth={1} />
                  </button>
                  <span className="bg-white border border-zinc-300 w-12 h-6 flex items-center justify-center text-sm font-semibold text-zinc-600 rounded">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    className="grid place-content-center size-6 rounded border border-zinc-300 bg-white hover:bg-zinc-200 cursor-pointer"
                    aria-label="افزایش تعداد"
                    onClick={() => handleQuantityChange(item.id, +1)}
                  >
                    <Plus size={14} strokeWidth={1} />
                  </button>
                </div>
                <button
                  className="cursor-pointer text-zinc-400 hover:text-rose-600 transition-all duration-200"
                  aria-label={`حذف ${item.name} از سبد خرید`}
                  onClick={() => removeFromCart(item.id)}
                >
                  <Trash2 size={20} strokeWidth={1.5} />
                </button>
              </div>
              <span className="text-[10px] text-zinc-700 mb-1 mt-3 inline-block">
                <strong className="text-sm ml-2 bg-zinc-200 px-2 py-0.5 rounded">
                  {(item.price * item.quantity).toLocaleString()}
                </strong>{" "}
                تومان
              </span>
            </div>
          </div>
          {index !== items.length - 1 && (
            <hr className="my-2 border-zinc-300" />
          )}
        </li>
      ))}
    </ul>
  );
};

export default CartItemList;
