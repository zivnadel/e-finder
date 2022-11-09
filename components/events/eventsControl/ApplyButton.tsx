import React from "react";
import { FaCheck } from "react-icons/fa";
import ColoredWrapper from "../../ui/wrappers/ColoredWrapper";

interface Props {
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

// a component that represents a check button to apply filters

const ApplyButton: React.FC<Props> = ({ onClick }) => {
  return (
    <ColoredWrapper
      className="bg-gradient-to-r from-primary to-secondary w-12 h-12 hover:opacity-70 hover:scale-105 transition-all cursor-pointer"
      onClick={onClick}
    >
      <FaCheck className="text-3xl" />
    </ColoredWrapper>
  );
};

export default ApplyButton;
