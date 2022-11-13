import React from "react";

// a view represnting a loading a title (with a background)

const LoadingText: React.FC = () => {
  return (
    <div className="w-full animate-pulse flex items-center justify-center">
      <div className="h-14 w-4/6 lg:w-2/6 m-5 bg-gray-200 rounded-full dark:bg-gray-700"></div>
    </div>
  );
};

export default LoadingText;
