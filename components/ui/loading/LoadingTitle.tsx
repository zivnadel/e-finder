import React from "react";

// a view represnting a loading a title (with a background)

const LoadingText: React.FC = () => {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="m-5 max-w-sm animate-pulse">
        <div className="h-14 w-96 bg-gray-200 rounded-full dark:bg-gray-700"></div>
      </div>
    </div>
  );
};

export default LoadingText;
