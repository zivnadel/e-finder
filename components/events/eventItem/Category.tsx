import React from "react";

// Import the required icons
import { RiCommunityFill as Community } from "react-icons/ri";
import { GiMusicalScore as Concerts } from "react-icons/gi";
import {
  AiOutlineGlobal as Expos,
  AiFillClockCircle as DaylightSavings,
  AiFillNotification as Protests,
} from "react-icons/ai";
import {
  MdFestival as Festivals,
  MdSportsScore as Sports,
  MdLocalAirport as AirportDelays,
} from "react-icons/md";
import {
  FaPaintBrush as PerformingArts,
  FaSchool as SchoolHolidays,
  FaHeartbeat as HealthWarnings,
} from "react-icons/fa";
import {
  BsSunglasses as Observances,
  BsStars as PublicHolidays,
  BsFillCloudLightningFill as SevereWeather,
  BsFillExclamationTriangleFill as Disasters,
} from "react-icons/bs";
import { IoNewspaperSharp as Politics } from "react-icons/io5";
import { HiUserGroup as Conferences } from "react-icons/hi";
import { BiTargetLock as TerrorAttacks } from "react-icons/bi";

import CategoryModel from "../../../models/CategoryModel";
import ColoredWrapper from "../../ui/wrappers/ColoredWrapper";

interface Props {
  category: CategoryModel;
}

// a component that wraps an icon and a category name for
// displaying rounded box with the category type

const Category: React.FC<Props> = ({ category }) => {
  let className: string = "";
  let icon: JSX.Element = <></>;

  // name transformation
  let categoryName: string | string[] = category.split("-");
  categoryName = categoryName.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });
  categoryName = categoryName.join(" ");

  // customized icon and color for each category
  switch (category) {
    case "community":
      className = "bg-gradient-to-r from-green-400 to-green-800";
      icon = <Community className="text-xl" />;
      break;
    case "conferences":
      className = "bg-gradient-to-r from-emerald-400 to-emerald-800";
      icon = <Conferences className="text-xl" />;
      break;
    case "academic":
      className = "bg-gradient-to-r from-orange-400 to-orange-800";
      icon = <SchoolHolidays className="text-xl" />;
      break;
    case "concerts":
      className = "bg-gradient-to-r from-red-400 to-red-800";
      icon = <Concerts className="text-xl" />;
      break;
    case "expos":
      className = "bg-gradient-to-r from-yellow-400 to-yellow-800";
      icon = <Expos className="text-xl" />;
      break;
    case "festivals":
      className = "bg-gradient-to-r from-purple-400 to-purple-800";
      icon = <Festivals className="text-xl" />;
      break;
    case "sports":
      className = "bg-gradient-to-r from-blue-400 to-blue-800";
      icon = <Sports className="text-xl" />;
      break;
    case "performing-arts":
      className = "bg-gradient-to-r from-pink-400 to-pink-800";
      icon = <PerformingArts className="text-xl" />;
      break;
    case "school-holidays":
      className = "bg-gradient-to-r from-amber-400 to-amber-800";
      icon = <SchoolHolidays className="text-xl" />;
      break;
    case "observances":
      className = "bg-gradient-to-r from-rose-400 to-rose-800";
      icon = <Observances className="text-xl" />;
      break;
    case "public-holidays":
      className = "bg-gradient-to-r from-indigo-400 to-indigo-800";
      icon = <PublicHolidays className="text-xl" />;
      break;
    case "politics":
      className = "bg-gradient-to-r from-yellow-400 to-yellow-800";
      icon = <Politics className="text-xl" />;
      break;
    case "daylight-savings":
      className = "bg-gradient-to-r from-cyan-400 to-cyan-800";
      icon = <DaylightSavings className="text-xl" />;
      break;
    case "protests":
      className = "bg-gradient-to-r from-teal-400 to-teal-800";
      icon = <Protests className="text-xl" />;
      break;
    case "health-warnings":
      className = "bg-gradient-to-r from-rose-400 to-rose-800";
      icon = <HealthWarnings className="text-xl" />;
      break;
    case "severe-weather":
      className = "bg-gradient-to-r from-orange-400 to-orange-800";
      icon = <SevereWeather className="text-xl" />;
      break;
    case "disasters":
      className = "bg-gradient-to-r from-red-600 to-red-900";
      icon = <Disasters className="text-xl" />;
      break;
    case "terror-attacks":
      className = "bg-gradient-to-r from-red-600 to-red-900";
      icon = <TerrorAttacks className="text-xl" />;
      break;
    case "airport-delays":
      className = "bg-gradient-to-r from-violet-400 to-violet-800";
      icon = <AirportDelays className="text-xl" />;
      break;
  }

  return (
    <ColoredWrapper
      className={`my-3 max-w-md w-fit flex-row ${className}`}
      useMinMaxWidth
    >
      <span className="mx-3">{icon}</span>
      <span className="mr-3">{categoryName}</span>
    </ColoredWrapper>
  );
};

export default Category;
