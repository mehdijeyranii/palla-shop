import { useCartStore } from "@/store/cartStore";
import { useUIStore } from "@/store/uiStore";
import { useNavigate } from "react-router-dom";

const SHIPPING_COST = 158000;

const CartFooter = () => {
  const { clearCart, totalPrice } = useCartStore();
  const setActiveOverlay = useUIStore((state) => state.setActiveOverlay);
  const navigate = useNavigate();

  const totalWithShipping = totalPrice + SHIPPING_COST;

  const handleViewCart = () => {
    setActiveOverlay(null);
    navigate("/cart");
  };

  const formatPrice = (price: number): string => {
    return price.toLocaleString("fa-IR");
  };

  return (
    <div className="p-4 border-t border-zinc-200 flex flex-col gap-3">
      <div className="bg-zinc-50 p-3 rounded-md space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-zinc-600">قیمت کالاها:</span>
          <span className="font-medium">{formatPrice(totalPrice)} تومان</span>
        </div>
        <div className="flex justify-between">
          <span className="text-zinc-600">هزینه ارسال:</span>
          <span className="font-medium">
            {formatPrice(SHIPPING_COST)} تومان
          </span>
        </div>
        <hr className="border-zinc-200 my-1" />
        <div className="flex justify-between text-green-600 font-bold">
          <span>جمع کل:</span>
          <span>{formatPrice(totalWithShipping)} تومان</span>
        </div>
      </div>

      <button
        type="button"
        onClick={handleViewCart}
        className="w-full bg-sky-600 hover:bg-sky-700 text-white py-2.5 rounded-md font-medium transition-colors cursor-pointer"
      >
        مشاهده سبد خرید
      </button>
      <button
        type="button"
        onClick={clearCart}
        className="w-full bg-white hover:bg-rose-600/10 text-rose-600 py-2 rounded-md transition-colors border border-rose-300 cursor-pointer"
      >
        خالی کردن سبد
      </button>
    </div>
  );
};

export default CartFooter;
