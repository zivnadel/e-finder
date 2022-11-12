import React from "react";
import { twMerge } from "tailwind-merge";
import Tooltip from "../../ui/Tooltip";
import ColoredWrapper from "../../ui/wrappers/ColoredWrapper";

interface Props {
  className?: string;
  text?: string;
  icon: React.ReactNode;
  tooltip?: string;
}

// component wrapping a cirular icon with a colored background
// in the event item in the grid

const EventIcon: React.FC<Props> = ({ text, icon, className, tooltip }) => {
  return (
    <ColoredWrapper
      dataTip={tooltip}
      className={twMerge(`text-3xl ${className}`)}
    >
      <span className="text-3xl">{icon}</span>
      {text && <h3 className="font-bold">{text}</h3>}{" "}
    </ColoredWrapper>
  );
};

export default EventIcon;
