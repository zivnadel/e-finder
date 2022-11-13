import React from "react";
import LoadingItem from "./LoadingItem";
import LoadingTitle from "./LoadingTitle";

// loading view for the grid

const LoadingEvents: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 m-5">
      <LoadingItem />
      <LoadingItem />
      <LoadingItem />
      <LoadingItem />
      <LoadingItem />
      <LoadingItem />
      <LoadingItem />
      <LoadingItem />
      <LoadingItem />
      <span className="lg:col-start-2">
        <LoadingItem />
      </span>
    </div>
  );
};

export default LoadingEvents;
