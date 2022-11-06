import React from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  className?: string;
  children: React.ReactNode;
  useMinMaxWidth?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
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
          !useMinMaxWidth && "h-[4.5rem] w-[4.5rem]"
        } shadow-lg flex flex-col items-center justify-center text-white rounded-full ${className}`
      )}
    >
      {children}
    </div>
  );
};

export default ColoredWrapper;
