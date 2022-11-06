import React from "react";
import { twMerge } from "tailwind-merge";
import ColoredWrapper from "../ui/wrappers/ColoredWrapper";

interface Props {
  className?: string;
  text?: string;
  icon: React.ReactNode;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

// component wrapping a cirular icon with a colored background
// in the event item in the grid

const EventIcon: React.FC<Props> = ({ text, icon, className }) => {
  return (
    <div>
      <ColoredWrapper className={twMerge(`text-3xl ${className}`)}>
        <span className="text-3xl">{icon}</span>
        {text && <h3 className="font-bold">{text}</h3>}{" "}
      </ColoredWrapper>
    </div>
  );
};

export default EventIcon;
