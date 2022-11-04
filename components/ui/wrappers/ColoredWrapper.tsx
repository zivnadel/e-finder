import React from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  className?: string;
  children: React.ReactNode;
  useMinMaxWidth?: boolean;
}

// component for wrapping a component with a colored background (and other styles)

const ColoredWrapper: React.FC<Props> = ({
  className,
  children,
  useMinMaxWidth = false,
}) => {
  return (
    <div
      className={twMerge(
        `p-2 ${
          !useMinMaxWidth && "h-20 w-20"
        } shadow-lg flex flex-col items-center justify-center text-white rounded-full ${className}`
      )}
    >
      {children}
    </div>
  );
};

export default ColoredWrapper;
