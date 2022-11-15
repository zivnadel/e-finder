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

import CategoryModel from "../../models/CategoryModel";
import ColoredWrapper from "../ui/wrappers/ColoredWrapper";
import { getCategoryDetails } from "../../utils/generalUtils";

interface Props {
  category: CategoryModel;
}

// a component that wraps an icon and a category name for
// displaying rounded box with the category type

const Category: React.FC<Props> = ({ category }) => {
  const { icon, background: className } = getCategoryDetails(category);

  // name transformation
  let categoryName: string | string[] = category.split("-");
  categoryName = categoryName.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });
  categoryName = categoryName.join(" ");

  return (
    <ColoredWrapper
      className={`my-3 md:my-0 max-w-md w-fit flex-row ${className}`}
      useMinMaxWidth
    >
      <span className="mx-3">{icon}</span>
      <span className="mr-3">{categoryName}</span>
    </ColoredWrapper>
  );
};

export default Category;
