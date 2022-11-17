import React from "react";
import ReactTooltip from "react-tooltip";

// a custom component warpping react-tooltip's tooltip component

const Tooltip: React.FC = () => {
  return (
    <ReactTooltip
      effect="solid"
      multiline
      className="font-semibold text-md py-2 px-3 opacity-70"
    />
  );
};

export default Tooltip;
