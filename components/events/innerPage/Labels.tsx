import React from "react";

interface Props {
  labels: string[];
}

const Labels: React.FC<Props> = ({ labels }) => {
  return (
    <div className="flex items-center gap-3 mx-5 mt-8 mb-3">
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
    </div>
  );
};

export default Labels;
