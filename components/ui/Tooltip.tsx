import React from "react";
import ReactTooltip from "react-tooltip";

// a custom component warpping react-tooltip's tooltip component

interface Props {
  effect?: "float" | "solid";
}

const Tooltip: React.FC<Props> = ({ effect = "solid" }) => {
  return (
    <ReactTooltip
      effect={effect}
      multiline
      className="font-semibold text-md py-2 px-3 opacity-70"
    />
  );
};

export default Tooltip;
