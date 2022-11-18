import React from "react";
import Tooltip from "../../ui/Tooltip";

interface Props {
  labels: string[];
  active: boolean;
}

// a container component for the labels of the event displayed in the inner event page

const Labels: React.FC<Props> = ({ labels, active }) => {
  return (
    <>
      <Tooltip />
      <div className="flex items-center justify-center flex-col md:flex-row gap-3 mx-5 mt-8 mb-3">
        {labels.map((label) => (
          <div
            key={label}
            className="transition-all hover:scale-105 opacity-80 hover:opacity-100 bg-gray-200 rounded-lg shadow-xl p-3"
          >
            <h3 className="bg-clip-text text-transparent bg-gradient-to-r from-secondary via-primary to-secondary text-2xl font-bold">
              {label}
            </h3>
          </div>
        ))}
        {active && (
          <div
            data-tip="The event is active now!"
            className="transition-all hover:scale-105 opacity-80 hover:opacity-100 bg-gradient-to-r from-green-500 to-green-800 rounded-lg shadow-xl p-3"
          >
            <h3 className="text-white text-2xl font-medium">active</h3>
          </div>
        )}
      </div>
    </>
  );
};

export default Labels;
