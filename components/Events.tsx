import React from "react";
import AppContext from "../store/AppContext";
import LoadingSpinner from "./ui/LoadingSpinner";

interface Props {}

// The event section in the page

const Events: React.FC<Props> = ({}) => {
  const appContext = React.useContext(AppContext);
  return appContext?.location ? (
    <div className="bg-white">
      <h1>{`You are in ${appContext.location.city}, ${appContext.location.state}, ${appContext.location.country}`}</h1>
    </div>
  ) : (
    <LoadingSpinner />
  );
};

export default Events;
