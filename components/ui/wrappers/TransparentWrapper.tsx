import React from "react";
import { twMerge } from "tailwind-merge";
import Tooltip from "../Tooltip";

interface Props {
  className?: string;
  icon?: JSX.Element;
  dataTip?: string;
  children: React.ReactNode;
}

// component for wrapping a component with a transparent background (and other styles)

const TransparentWrapper: React.FC<Props> = ({
  className,
  children,
  icon,
  dataTip,
}) => {
  return (
    <>
      <Tooltip />
      <div
        data-tip={dataTip}
        className={twMerge(
          `p-2 px-3 cursor-default shadow-lg outline-none flex items-center justify-center gap-3 text-black border-black border-2 rounded-full ${className}`
        )}
      >
        {icon}
        {children}
      </div>
    </>
  );
};

export default TransparentWrapper;
