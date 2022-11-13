import React from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  dataTip?: string;
  type: "submit" | "button" | "reset";
  children: React.ReactNode;
}

// a UI component to be used as squared button with gradient background

const SquareButton: React.FC<Props> = ({
  className,
  onClick,
  dataTip,
  type = "button",
  children,
}) => {
  return (
    <button
      data-tip={dataTip}
      type={type}
      onClick={onClick}
      className={twMerge(
        `p-4 shadow-md text-sm font-medium text-white bg-gradient-to-r from-primary to-secondary rounded-lg hover:opacity-70 hover:scale-105 transition-all ${className}`
      )}
    >
      {children}
    </button>
  );
};

export default SquareButton;
