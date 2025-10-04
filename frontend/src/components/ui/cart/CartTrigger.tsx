import { Link } from "react-router-dom";
import CartIconWithBadge from "./CartIconWithBadge";
import type React from "react";

interface CartTriggerProps {
  onClick: (e: React.MouseEvent) => void;
  totalItems: number;
  isInCartPage: boolean;
}

const CartTrigger: React.FC<CartTriggerProps> = ({
  onClick,
  totalItems,
  isInCartPage,
}) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isInCartPage) return;
    e.preventDefault();
    onClick(e);
  };

  return (
    <Link
      to="/cart"
      onClick={handleClick}
      className="cursor-pointer grid place-content-center size-10 border border-zinc-300 rounded-md relative hover:bg-zinc-100 transition-colors duration-300 z-[55] bg-white"
      aria-label={totalItems ? `سبد خرید (${totalItems} کالا)` : "سبد خرید"}
    >
      <CartIconWithBadge totalItems={totalItems} />
    </Link>
  );
};

export default CartTrigger;
