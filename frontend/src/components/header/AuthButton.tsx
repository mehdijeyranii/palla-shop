import { useUIStore } from "@/store/uiStore";
import {
  Bell,
  ClipboardList,
  Heart,
  LogOut,
  Signpost,
  UserRound,
} from "lucide-react";
import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const AuthButton = () => {
  const isAuthenticated = true;
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const activeOverlay = useUIStore((state) => state.activeOverlay);
  const setActiveOverlay = useUIStore((state) => state.setActiveOverlay);

  const isOpen = activeOverlay === "account" && isAuthenticated;

  const toggleAccount = () => {
    if (!isAuthenticated) {
      navigate("/register");
    } else {
      if (activeOverlay === "account") {
        setActiveOverlay(null);
      } else {
        setActiveOverlay("account");
      }
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActiveOverlay(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, setActiveOverlay]);

  return (
    <div className="relative group" ref={dropdownRef}>
      <button
        onClick={toggleAccount}
        className="h-10 flex items-center gap-2 px-4 border border-zinc-300 rounded-md cursor-pointer group-hover:bg-zinc-100 transition-all duration-300"
      >
        <span>{isAuthenticated ? "حساب کاربری" : "ثبت‌نام | ورود"}</span>
        <UserRound strokeWidth={1.5} size={18} />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-80 bg-white border border-zinc-200 rounded-lg shadow-xl">
          <ul className="flex flex-col p-2 gap-2">
            <li className="">
              <Link
                className="px-2 py-2.5 rounded-md flex items-center hover:bg-hover-section transition-all duration-300 gap-2"
                to="/profile"
              >
                <UserRound size={20} />
                <span className="">پروفایل</span>
              </Link>
            </li>
            <hr className="text-zinc-300" />
            <li className="">
              <Link
                className="px-2 py-2.5 rounded-md flex items-center hover:bg-hover-section transition-all duration-300 gap-2"
                to="/profile/favorites"
              >
                <Heart size={20} />
                <span className="">علاقه‌مندی‌ها</span>
              </Link>
            </li>
            <li className="">
              <Link
                className="px-2 py-2.5 rounded-md flex items-center hover:bg-hover-section transition-all duration-300 gap-2"
                to="/profile/addresses"
              >
                <Signpost size={20} />
                <span className="">آدرس‌ها</span>
              </Link>
            </li>
            <li className="">
              <Link
                className="px-2 py-2.5 rounded-md flex items-center hover:bg-hover-section transition-all duration-300 gap-2"
                to="/profile/orders"
              >
                <ClipboardList size={20} />
                <span className="">سفارش‌ها</span>
              </Link>
            </li>
            <li className="">
              <Link
                className="px-2 py-2.5 rounded-md flex items-center hover:bg-hover-section transition-all duration-300 gap-2"
                to="/profile/notifications"
              >
                <Bell size={20} />
                <span className="">پیام‌ها</span>
              </Link>
            </li>
            <hr className="text-zinc-300" />
            <li className="">
              <button
                className="px-2 py-2.5 rounded-md flex items-center bg-rose-600/10 text-rose-600 gap-2 w-full cursor-pointer"
                onClick={() => {
                  setActiveOverlay(null);
                }}
              >
                <LogOut size={20} strokeWidth={1.5} />
                <span className="">خروج</span>
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default AuthButton;
