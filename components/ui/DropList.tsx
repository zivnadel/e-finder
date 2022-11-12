import React, { Fragment } from "react";

import { BsChevronExpand } from "react-icons/bs";
import { Listbox, Transition } from "@headlessui/react";
import { capitalizeAndRemoveDashes } from "../../utils/stringUtils";

interface Props {
  options: { name: string | number; color: string; bgColor: string }[];
  selected: any;
  setSelected: React.Dispatch<React.SetStateAction<any>>;
  name: string;
  selectedIcon: JSX.Element;
  multiple?: boolean;
}

// this component is a dropdown list that allows the user to select an option
// it is handled by the headlessui library

const FilterCategory: React.FC<Props> = ({
  options,
  selected,
  setSelected,
  name,
  selectedIcon,
  multiple,
}) => {
  return (
    <Listbox value={selected} onChange={setSelected} multiple={multiple}>
      <div className="relative">
        <Listbox.Button
          className={`flex items-center justify-between gap-6 w-full cursor-poiner rounded-lg bg-gradient-to-r from-primary to-secondary text-white px-5 py-2 shadow-md hover:opacity-70 hover:scale-105 transition-all font-semibold`}
        >
          {name} <BsChevronExpand />
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="z-10 absolute mt-2 max-h-60 w-full overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm font-semibold">
            {options.map((option, index) => (
              <Listbox.Option
                key={index}
                className={({ active }) =>
                  `relative select-none py-2 pl-10 pr-4 ${
                    active
                      ? `${option.bgColor} bg-opacity-70 text-white`
                      : "text-gray-900"
                  }`
                }
                value={option.name}
              >
                {({ selected, active }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-semibold" : "font-medium"
                      }`}
                    >
                      {capitalizeAndRemoveDashes(option.name)}
                      {typeof option.name === "number" && "km"}
                    </span>
                    {selected ? (
                      <span
                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                          active ? "text-white" : option.color
                        }`}
                      >
                        <span className="text-xl">{selectedIcon}</span>
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default FilterCategory;
