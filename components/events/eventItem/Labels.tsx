import React from "react";

import { BiChevronRight } from "react-icons/bi";

import ColoredWrapper from "../../ui/wrappers/ColoredWrapper";

interface Props {
  labels: string[];
}

// component for displaying the labels of an event in the bottom
// of an event item in the grid.

const Labels: React.FC<Props> = ({ labels }) => {
  return (
    <div>
      {labels.map((label, index) => (
        <span key={label}>
          {index < 4 && (
            <ColoredWrapper className="my-1 inline-flex flex-row w-fit h-10 bg-gradient-to-r from-gray-500 to-gray-700 mx-1">
              <BiChevronRight className="text-2xl mr-1" />
              <span className="mr-2">{label}</span>
            </ColoredWrapper>
          )}
        </span>
      ))}
    </div>
  );
};

export default Labels;
