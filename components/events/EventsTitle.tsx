import React from "react";

import Location from "../../models/Location";

interface Props {
  location: Location;
}

// component for the styled title in the events grid
const EventsTitle: React.FC<Props> = ({ location }) => {
  return (
    <div className="text-center mt-5 mx-3 md:mx-0 p-3 bg-gradient-to-r from-primary to-secondary rounded-3xl font-bold text-white text-2xl">
      <h1>{`Events and activities around ${location.city}${
        location.state || (location.country && ", ")
      }${location.state}${location.country ? ", " : ""}${
        location.country
      }`}</h1>
    </div>
  );
};

export default EventsTitle;
