import type React from "react";

interface VerticalDividerProps {
  height?: string;
  color?: string;
  className?: string;
}

const VerticalDivider = ({
  height = "h-6",
  color = "bg-zinc-300",
  className = "",
}: VerticalDividerProps) => {
  return <div className={`w-px ${height} ${color} ${className}`} />;
};

export default VerticalDivider;
