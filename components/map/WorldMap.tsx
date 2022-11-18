import React from "react";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";
import { Element } from "react-scroll";
import Title from "../ui/Title";
import Tooltip from "../ui/Tooltip";
import ReactTooltip from "react-tooltip";

interface Props {
  country: string;
}

// world map component to show the country of events without a
// specific location.
// Created with react-simple-maps

const WorldMap: React.FC<Props> = ({ country }) => {
  const [tooltip, setTooltip] = React.useState("");

  return (
    <>
      <ReactTooltip>{tooltip}</ReactTooltip>
      <Element name="map" className={`flex gap-3 items-center flex-col`}>
        <Title text="Event Region" className="w-2/6 mb-0 md:mb-5" />
        <div data-tip="">
          <ComposableMap className="w-full h-[40vh] md:h-[70vh]">
            <ZoomableGroup>
              <Geographies geography={"/world.json"}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onMouseEnter={
                        geo.properties.iso_a2 === country
                          ? () => {
                              setTooltip(`${geo.properties.name}`);
                            }
                          : undefined
                      }
                      onMouseLeave={
                        geo.properties.iso_a2 === country
                          ? () => {
                              setTooltip("");
                            }
                          : undefined
                      }
                      stroke="#c9c9cf"
                      style={{
                        default: {
                          fill: `${
                            geo.properties.iso_a2 === country
                              ? "#74BDCB"
                              : "#a1a1aa"
                          }`,
                          outline: "none",
                        },
                        hover: {
                          fill: `${
                            geo.properties.iso_a2 === country
                              ? "#3e96a8"
                              : "#878792"
                          }`,
                          outline: "none",
                        },
                        pressed: {
                          fill: `${
                            geo.properties.iso_a2 === country
                              ? "#3e96a8"
                              : "#878792"
                          }`,
                          outline: "none",
                        },
                      }}
                    />
                  ))
                }
              </Geographies>
            </ZoomableGroup>
          </ComposableMap>
        </div>
      </Element>
    </>
  );
};

export default WorldMap;