import React from "react";
import { twMerge } from "tailwind-merge";
import ColoredWrapper from "../wrappers/ColoredWrapper";

interface Props {
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  dataTip?: string;
  children: React.ReactNode;
}

// a UI component to be used as rounded button with gradient background

const RoundedButton: React.FC<Props> = ({
  className,
  onClick,
  dataTip,
  children,
}) => {
  return (
    <ColoredWrapper
      dataTip={dataTip}
      className={twMerge(
        `bg-gradient-to-r from-primary to-secondary w-12 h-12 hover:opacity-70 hover:scale-105 transition-all cursor-pointer ${className}`
      )}
      onClick={onClick}
    >
      {children}
    </ColoredWrapper>
  );
};

export default RoundedButton;
