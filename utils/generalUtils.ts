// A collection of general utilities

// this function sanitizes the selected option(s) to be displayed in the dropdown list
export const capitalizeAndRemoveDashes = (option: string | number) => {
  return option
    .toString()
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
