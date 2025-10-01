import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className }) => {
  return (
    <div
      className={`max-w-7xl mx-auto w-full px-4 sm:px-6 xl:px-0 ${
        className || ""
      }`}
    >
      {children}
    </div>
  );
};

export default Container;
