import React from "react";
import { Chart } from "react-google-charts";
import { Element } from "react-scroll";
import Title from "./ui/Title";

interface Props {
  country: string;
  className: string;
}

// A chart component displaying the world map with the selected country
// used to display the selected country of an event without an exact location

const WorldChart: React.FC<Props> = ({ country, className }) => {
  const data = [["Country"], [country]];

  return (
    <Element name="map" className={className}>
      <div className="flex items-center justify-center">
        <Title text="Event Region" className="w-2/6 mb-0 md:mb-5" />
      </div>
      <Chart chartType="GeoChart" data={data} width="100%" height="100%" />
    </Element>
  );
};

export default WorldChart;
