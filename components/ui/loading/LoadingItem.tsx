import React from "react";

// loading item for the loading grid (represents an event box)
const LoadingItem: React.FC = () => {
  return (
    <div className="p-4 rounded border border-gray-200 shadow animate-pulse md:p-6">
      {/* Icons */}
      <div className="flex items-center justify-center m-4 mb-8 gap-4">
        <div className="h-[4.5rem] w-[4.5rem] bg-gray-200 rounded-full"></div>
        <div className="h-[4.5rem] w-[4.5rem] bg-gray-200 rounded-full"></div>
        <div className="h-[4.5rem] w-[4.5rem] bg-gray-200 rounded-full"></div>
      </div>
      {/* Content */}
      <div className="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
      <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full"></div>
      {/* Labels */}
      <div className="flex gap-2 mt-6 flex-wrap">
        <div className="h-10 w-24 bg-gray-200 rounded-full mb-2.5"></div>
        <div className="h-10 w-24 bg-gray-200 rounded-full mb-2.5"></div>
        <div className="h-10 w-24 bg-gray-200 rounded-full mb-2.5"></div>
      </div>
    </div>
  );
};

export default LoadingItem;
