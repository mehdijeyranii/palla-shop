import { Container } from "../common";
import TopBanner from "../ui/TopBanner";
import SummerBanner from "../../assets/images/banner/01.gif";
import { useEffect, useRef, useState } from "react";

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
      className="bg-zinc-200 w-full fixed top-0 right-0"
      aria-label="Main header"
    >
      {showBanner && <TopBanner imageSrc={SummerBanner} linkTo="/products" />}
      <Container>Header</Container>
    </header>
  );
};

export default Header;
