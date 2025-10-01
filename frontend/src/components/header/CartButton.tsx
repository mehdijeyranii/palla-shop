import { useCartStore } from "@/store/cartStore";
import { ShoppingCart } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const CartButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { items, totalItems, totalPrice } = useCartStore();

  const isInCartPage = location.pathname === "/cart";

  const displayCount = totalItems > 9 ? "9+" : totalItems;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen && !isInCartPage) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, isInCartPage]);

  useEffect(() => {
    if (isInCartPage) {
      setIsOpen(false);
    }
  }, [isInCartPage]);

  return (
    <div className="relative" ref={dropdownRef}>
      <Link
        to="/cart"
        onClick={(e) => {
          if (!isInCartPage) {
            e.preventDefault();
            setIsOpen((prev) => !prev);
          }
        }}
        className="cursor-pointer grid place-content-center size-10 bg-transparent border border-zinc-300 rounded-md relative hover:border-sky-500 transition-colors"
        aria-label={totalItems ? `سبد خرید (${totalItems} کالا)` : "سبد خرید"}
      >
        <ShoppingCart strokeWidth={1.5} size={20} aria-hidden="true" />
        {totalItems > 0 && (
          <span className="absolute text-[10px] font-semibold bg-rose-500 text-white size-4 rounded-full leading-4 top-1 right-1">
            {displayCount}
          </span>
        )}
      </Link>

      {/* Dropdown */}
      {!isInCartPage && isOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/20 md:hidden"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-1/2 -translate-x-1/2 mt-2 w-80 md:w-96 bg-white border border-zinc-200 rounded-lg shadow-lg z-50 md:top-full md:left-0 md:right-auto md:translate-x-0">
            <div className="p-4 border-b border-zinc-200">
              <h3 className="font-medium text-zinc-800">سبد خرید شما</h3>
              <p className="text-sm text-zinc-500 mt-1">
                {items.length} کالا • {totalPrice.toLocaleString()} تومان
              </p>
            </div>

            <div className="max-h-60 overflow-y-auto">
              {items.length === 0 ? (
                <div className="p-6 text-center text-zinc-500 text-sm">
                  سبد خرید شما خالی است.
                </div>
              ) : (
                <ul>
                  {items.map((item) => (
                    <li
                      key={item.id}
                      className="p-3 hover:bg-zinc-50 border-b border-zinc-100 last:border-0"
                    >
                      <div className="font-medium text-zinc-800 text-sm">
                        {item.name}
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-xs text-zinc-500">
                          {item.quantity} × {item.price.toLocaleString()} تومان
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-3 border-t border-zinc-200">
                <Link
                  to="/cart"
                  className="block w-full text-center bg-sky-600 hover:bg-sky-700 text-white text-sm py-2 rounded-md transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  مشاهده سبد خرید
                </Link>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CartButton;
