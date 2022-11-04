// collection of unility functions/variable for date manipulation
// pretty much self explanatory

export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const stripLeadingZerosDate = (dateStr: string) => {
  return dateStr
    .split("-")
    .reduce((date, datePart) => {
      return (date += parseInt(datePart) + "-");
    }, "")
    .slice(0, -1);
};
