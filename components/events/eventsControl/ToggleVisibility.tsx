import React from "react";

import { AiFillLock, AiFillUnlock } from "react-icons/ai";

import ColoredWrapper from "../../ui/wrappers/ColoredWrapper";

// a button to toggle the visibility of the event (private event or public event)

const ToggleVisibility: React.FC = () => {
  const [isPrivate, setIsPrivate] = React.useState(false);

  const toggleVisibility = () => {
    setIsPrivate((prevState) => !prevState);
  };

  return (
    <ColoredWrapper
      onClick={toggleVisibility}
      className="bg-gradient-to-r from-primary to-secondary w-12 h-12 hover:opacity-70 hover:scale-105 transition-all cursor-pointer"
    >
      {isPrivate ? (
        <AiFillLock className="text-3xl" />
      ) : (
        <AiFillUnlock className="text-3xl" />
      )}
    </ColoredWrapper>
  );
};

export default ToggleVisibility;
