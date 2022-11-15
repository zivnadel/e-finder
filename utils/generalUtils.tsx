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
import { HiUserGroup as Conferences, HiAcademicCap } from "react-icons/hi";
import { BiTargetLock as TerrorAttacks } from "react-icons/bi";

// A collection of utilities to help format and sanitize strings

// this function sanitizes the selected option(s) to be displayed in the dropdown list
export const capitalizeAndRemoveDashes = (option: string | number) => {
  return option
    .toString()
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// this function receives a category name and returns relevant deatils about it
export const getCategoryDetails = (category: string) => {
  let icon: JSX.Element = <></>;
  let description = "";
  let background: string = "";
  switch (category) {
    case "community":
      icon = <Community />;
      description = "Community held events and meetings.";
      background = "bg-gradient-to-r from-green-400 to-green-800";
      break;
    case "academic":
      icon = <HiAcademicCap />;
      description = "Academic events, holidays, meetings and more.";
      background = "bg-gradient-to-r from-orange-400 to-orange-800";
      break;
    case "concerts":
      icon = <Concerts />;
      description = "Concerts, music shows and live events.";
      background = "bg-gradient-to-r from-red-400 to-red-800";
      break;
    case "expos":
      icon = <Expos />;
      description = "Expos, trade shows and exhibitions.";
      background = "bg-gradient-to-r from-yellow-400 to-yellow-800";
      break;
    case "daylight-savings":
      icon = <DaylightSavings />;
      description = "Points in time where the clock is adjusted.";
      background = "bg-gradient-to-r from-cyan-400 to-cyan-800";
      break;
    case "protests":
      icon = <Protests />;
      description = "Protests and public parades against a cause.";
      background = "bg-gradient-to-r from-teal-400 to-teal-800";
      break;
    case "festivals":
      icon = <Festivals />;
      description = "Festivals, celebrations and more.";
      background = "bg-gradient-to-r from-purple-400 to-purple-800";
      break;
    case "sports":
      icon = <Sports />;
      description = "Soccer, basketball, baseball, competitions and more.";
      background = "bg-gradient-to-r from-blue-400 to-blue-800";
      break;
    case "airport-delays":
      icon = <AirportDelays />;
      description = "Real-time airport delays and cancellations.";
      background = "bg-gradient-to-r from-violet-400 to-violet-800";
      break;
    case "performing-arts":
      icon = <PerformingArts />;
      description = "Theater, dance, opera, ballet, street shows and more.";
      background = "bg-gradient-to-r from-pink-400 to-pink-800";
      break;
    case "school-holidays":
      icon = <SchoolHolidays />;
      description = "Holidays associated with schools and universities.";
      background = "bg-gradient-to-r from-amber-400 to-amber-800";
      break;
    case "health-warnings":
      icon = <HealthWarnings />;
      description =
        "Crucial health warnings regrading public health, COVID-19 and more.";
      background = "bg-gradient-to-r from-rose-400 to-rose-800";
      break;
    case "observances":
      icon = <Observances />;
      description = "Observances, commemorations and special days.";
      background = "bg-gradient-to-r from-rose-400 to-rose-800";
      break;
    case "public-holidays":
      icon = <PublicHolidays />;
      description = "Public holidays and national celebrations.";
      background = "bg-gradient-to-r from-indigo-400 to-indigo-800";
      break;
    case "severe-weather":
      icon = <SevereWeather />;
      description = "Real-time severe weather alerts and warnings.";
      background = "bg-gradient-to-r from-orange-400 to-orange-800";
      break;
    case "disasters":
      icon = <Disasters />;
      description = "Real-time disaster alerts and warnings.";
      background = "bg-gradient-to-r from-red-600 to-red-900";
      break;
    case "politics":
      icon = <Politics />;
      description = "Political events, elections, dibates and more.";
      background = "bg-gradient-to-r from-yellow-400 to-yellow-800";
      break;
    case "conferences":
      icon = <Conferences />;
      description = "Conferences, summits, meetings and more.";
      background = "bg-gradient-to-r from-emerald-400 to-emerald-800";
      break;
    case "terror-attacks":
      icon = <TerrorAttacks />;
      description = "Real-time terror attacks and security alerts.";
      background = "bg-gradient-to-r from-red-600 to-red-900";
      break;
  }

  return { icon, description, background };
};
