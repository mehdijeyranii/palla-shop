import React from "react";
import { Link, type To } from "react-router-dom";
import clsx from "clsx";

interface TopBannerProps {
  text?: string;
  imageSrc?: string;
  linkText?: string;
  linkTo: To;
  className?: string;
}

const TopBanner: React.FC<TopBannerProps> = ({
  text,
  imageSrc,
  linkText,
  linkTo,
  className,
}) => {
  if (!text && !imageSrc) return null;

  const isImage = !!imageSrc;

  const content = isImage ? (
    <img
      src={imageSrc}
      alt={text || "Promotional banner"}
      className="h-full object-contain max-h-full hidden md:block"
    />
  ) : (
    <h2 className="text-sm md:text-base font-medium">{text}</h2>
  );

  const baseClasses = clsx(
    "w-full",
    "h-9 md:h-full",
    "overflow-hidden",
    "bg-sky-600 text-white",
    className
  );

  const layoutClasses =
    !isImage &&
    clsx(
      "flex justify-between md:justify-center items-center",
      "justify-between",
      "gap-6 xl:gap-10",
      "px-3 md:px-4 py-2"
    );

  const finalClassName = clsx(baseClasses, layoutClasses);

  return (
    <Link
      to={linkTo}
      className={finalClassName}
      aria-label="Promotional banner"
    >
      {content}
      {linkText && (
        <span className="px-3 py-0.5 bg-white/20 text-white rounded whitespace-nowrap text-xs md:text-sm">
          {linkText}
        </span>
      )}
    </Link>
  );
};

export default TopBanner;
