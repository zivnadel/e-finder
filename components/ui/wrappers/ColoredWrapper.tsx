import React from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  className?: string;
  children: React.ReactNode;
  useMinMaxWidth?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

// component for wrapping a component with a colored background (and other styles)

const ColoredWrapper: React.FC<Props> = ({
  className,
  children,
  useMinMaxWidth = false,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={twMerge(
        `p-2 ${
          !useMinMaxWidth && "h-[4.5rem] w-[4.5rem]"
        } shadow-lg outline-none flex flex-col items-center justify-center text-white rounded-full ${className}`
      )}
    >
      {children}
    </div>
  );
};

export default ColoredWrapper;
