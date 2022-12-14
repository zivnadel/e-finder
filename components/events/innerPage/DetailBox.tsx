import React from "react";

interface Props {
  title: string;
  content: string;
  description: string;
  icon: JSX.Element;
}

// a component that represents a detail box in the inner event page

const DetailBox: React.FC<Props> = ({ title, content, description, icon }) => {
  return (
    <div
      className="basis-full sm:basis-[30%] md:basis-[22%] lg:basis-[20%] grow-0 transition-all hover:scale-105 opacity-80 hover:opacity-100 bg-gray-200 rounded-lg shadow-xl p-3 flex flex-col gap-2"
      style={{ wordBreak: "break-word" }}
    >
      <div className="h-14 w-14 flex items-center justify-center rounded-xl shadow-md text-white bg-gradient-to-r from-primary to-secondary">
        <span className="text-4xl">{icon}</span>
      </div>
      <h1 className="text-xl font-bold">{title}</h1>
      <h2 className="text-3xl font-extrabold bg-gradient-to-r from-secondary via-primary to-secondary bg-clip-text text-transparent">
        {content}
      </h2>
      <p className="italic font-medium">{description}</p>
    </div>
  );
};

export default DetailBox;
