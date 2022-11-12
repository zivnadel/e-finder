import React from "react";

import { GiPathDistance } from "react-icons/gi";
import { BiSortUp, BiSortDown } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";

import CategoryModel from "../../../models/CategoryModel";
import { capitalizeAndRemoveDashes } from "../../../utils/stringUtils";
import Title from "../../ui/Title";
import TransparentWrapper from "../../ui/wrappers/TransparentWrapper";
import Category from "../eventItem/Category";

interface Props {
  categories: CategoryModel[];
  radius: number;
  sort: string;
}

// This component is a display that shows the current filters
// (cateogories and sorting methods)

const FiltersDisplay: React.FC<Props> = ({ categories, radius, sort }) => {
  const constructCategoryTooltip = () => {
    let tooltip = "";
    for (let i = 2; i < categories.length; i++) {
      tooltip += capitalizeAndRemoveDashes(categories[i]);

      if (i !== categories.length - 1) {
        tooltip += ", ";
      }

      if (i === 6 || i === 10 || i === 14) {
        tooltip += "<br>";
      }
    }
    return tooltip;
  };

  return (
    <div className="flex flex-col justify-center items-center p-4 w-auto bg-white shadow-lg m-5 rounded-xl gap-3">
      <Title text="Filters" className="p-2 text-lg" />
      <div className="flex gap-2 items-center justify-center">
        {categories.map((category, index) => {
          if (index > 1) {
            return;
          }
          return <Category key={category} category={category} />;
        })}
        {categories.length > 2 && (
          <TransparentWrapper
            dataTip={constructCategoryTooltip()}
            icon={<AiOutlinePlus />}
          >
            {categories.length - 2} More
          </TransparentWrapper>
        )}
        {categories.length > 0 && (
          <span className="h-8 m-3 w-0.5 rounded-full bg-gray-400"></span>
        )}
        <TransparentWrapper icon={<GiPathDistance />}>
          Radius: <span className="font-semibold">{radius}km</span>
        </TransparentWrapper>
        <TransparentWrapper
          icon={sort.startsWith("-") ? <BiSortDown /> : <BiSortUp />}
        >
          Sorted by:
          <span className="font-semibold">
            {capitalizeAndRemoveDashes(sort)}
          </span>
        </TransparentWrapper>
      </div>
    </div>
  );
};

export default FiltersDisplay;
