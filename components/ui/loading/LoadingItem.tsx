import React from "react";

// loading item for the loading grid (represents an event box)
const LoadingItem: React.FC = () => {
  return (
    <div className="p-4 rounded border border-gray-200 shadow animate-pulse md:p-6">
      <div className="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
      <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full"></div>
      <div className="flex items-center mt-4 space-x-3">
        <div>
          <div className="h-2.5 bg-gray-200 rounded-full mb-2"></div>
          <div className="w-48 h-2 bg-gray-200 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingItem;
