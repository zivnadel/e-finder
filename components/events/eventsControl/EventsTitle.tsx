import React from "react";

import Location from "../../../models/LocationModel";
import Title from "../../ui/Title";

interface Props {
  location: Location;
}

// component for the styled title in the events grid
const EventsTitle: React.FC<Props> = ({ location }) => {
  return (
    <div className="flex items-center justify-center w-full">
      <Title
        text={`Events and activities around ${location.city}${
          location.country && ","
        } ${location.country}`}
      />
    </div>
  );
};

export default EventsTitle;
