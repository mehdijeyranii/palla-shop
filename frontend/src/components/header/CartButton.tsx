import { useCartStore } from "@/store/cartStore";
import { useCallback, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useUIStore } from "@/store/uiStore";
import { CartDropdown, CartTrigger } from "../ui";

const CartButton = () => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { totalItems } = useCartStore();

  const isInCartPage = location.pathname === "/cart";
  const activeOverlay = useUIStore((state) => state.activeOverlay);
  const setActiveOverlay = useUIStore((state) => state.setActiveOverlay);

  const isOpen = activeOverlay === "cart" && !isInCartPage;

  const toggleCart = useCallback(() => {
    if (isInCartPage) return;
    setActiveOverlay(isOpen ? null : "cart");
  }, [isInCartPage, isOpen, setActiveOverlay]);

  const closeCart = useCallback(() => {
    setActiveOverlay(null);
  }, [setActiveOverlay]);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeCart();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, closeCart]);

  return (
    <div className="relative" ref={dropdownRef}>
      <CartTrigger
        isInCartPage={isInCartPage}
        totalItems={totalItems}
        onClick={toggleCart}
      />

      {isOpen && <CartDropdown />}
    </div>
  );
};

export default CartButton;
