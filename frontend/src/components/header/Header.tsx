import { Container } from "../common";
import SummerBanner from "../../assets/images/banner/01.gif";
import { useEffect, useRef, useState } from "react";
import { Logo, TopBanner, VerticalDivider } from "../ui";
import SearchBar from "./SearchBar";
import UserActions from "./UserActions";

// const ads = {
//   text: "تا 99% تخفیف ویژه محصولات پر فروش",
//   linkText: "خرید",
//   linkTo: "/product",
// };

const Header = () => {
  const [showBanner, setShowBanner] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current && currentScrollY > 500) {
        setShowBanner(false);
      } else if (currentScrollY < lastScrollY.current) {
        setShowBanner(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  console.log(lastScrollY.current);

  return (
    <header
      className="bg-white w-full fixed top-0 right-0 z-50 border-b border-zinc-300"
      aria-label="Main header"
    >
      {showBanner && <TopBanner imageSrc={SummerBanner} linkTo="/products" />}
      <Container>
        <div className="w-full h-full flex justify-center md:justify-between items-center py-2">
          <div className="w-full md:w-4/5 h-full flex justify-center md:justify-start items-center gap-2 relative">
            <Logo />
            <VerticalDivider />
            <SearchBar />
          </div>
          <div className="w-2/5 md:w-2/6 h-10 hidden md:flex justify-end items-center gap-2">
            <UserActions />
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
