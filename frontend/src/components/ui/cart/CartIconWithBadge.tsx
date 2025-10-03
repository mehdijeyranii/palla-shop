import { ShoppingCart } from "lucide-react";
import React from "react";

interface CartIconWithBadgeProps {
  totalItems: number;
}

const CartIconWithBadge = ({ totalItems }: CartIconWithBadgeProps) => {
  const displayCount = totalItems > 9 ? "9+" : totalItems;

  return (
    <>
      <ShoppingCart strokeWidth={1.5} size={20} aria-hidden="true" />
      {totalItems > 0 && (
        <span className="absolute text-[10px] font-semibold bg-rose-500 text-white size-4 rounded-full pt-0.5 top-1 right-1 grid place-content-center">
          {displayCount}
        </span>
      )}
    </>
  );
};

export default CartIconWithBadge;
