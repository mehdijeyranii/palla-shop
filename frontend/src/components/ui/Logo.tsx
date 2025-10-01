import { Link } from "react-router-dom";
import LogoImage from "@/assets/images/palladium.svg";

const Logo = () => {
  return (
    <Link
      to="/"
      className="block w-20 md:w-28"
      aria-label="بازگشت به صفحه اصلی پالادیوم شاپ"
    >
      <img
        src={LogoImage}
        alt="پالادیوم شاپ"
        width={112}
        height={40}
        loading="eager"
        className="w-full h-auto object-contain"
      />
    </Link>
  );
};

export default Logo;
