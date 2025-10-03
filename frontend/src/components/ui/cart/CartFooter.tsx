import React from "react";
import { Link } from "react-router-dom";

interface CartFooterProps {
  onClose: () => void;
  hasItems: boolean;
  itemCount: number;
  totalPrice: number;
}

const CartFooter: React.FC<CartFooterProps> = ({
  onClose,
  hasItems,
  itemCount,
  totalPrice,
}) => {
  if (!hasItems) return null;

  return (
    <div className="p-3 border-t border-zinc-200 flex flex-col gap-3">
      {hasItems && (
        <p className="text-sm text-zinc-500 mt-1 flex items-center justify-center gap-2">
          <span>
            <strong className="bg-zinc-200 px-2 rounded mx-1">
              {itemCount}
            </strong>
            کالا
          </span>
          <div className="h-0.5 w-4 bg-zinc-400 inline-block rounded-full" />
          <span>
            <strong className="bg-zinc-200 px-2 rounded mx-1">
              {totalPrice.toLocaleString()}
            </strong>
            تومان
          </span>
        </p>
      )}
      <Link
        to="/cart"
        className="block w-full text-center bg-sky-600 hover:bg-sky-700 text-white text-sm py-2 rounded-md transition-colors"
        onClick={onClose}
      >
        مشاهده سبد خرید
      </Link>
    </div>
  );
};

export default CartFooter;
