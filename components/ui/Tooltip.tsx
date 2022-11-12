import React from "react";
import ReactTooltip from "react-tooltip";

// a custom component warpping react-tooltip's tooltip component

const Tooltip: React.FC = () => {
  return (
    <ReactTooltip
      effect="solid"
      multiline
      className="font-semibold text-md p-2 opacity-70"
    />
  );
};

export default Tooltip;
