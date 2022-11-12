import React from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  text: string;
  className?: string;
}

// a Title component (container with a gradient background and a title)

const Title: React.FC<Props> = ({ text, className }) => {
  return (
    <div
      className={twMerge(
        `text-center mt-5 mx-3 md:mx-0 p-3 bg-gradient-to-r from-primary to-secondary rounded-3xl font-bold text-white text-2xl ${className}`
      )}
    >
      <h1>{text}</h1>
    </div>
  );
};

export default Title;
