import React from "react";

interface Props {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  dataTip?: string;
  type: "submit" | "button" | "reset";
  children: React.ReactNode;
}

// a UI component to be used as squared button with gradient background

const SquareButton: React.FC<Props> = ({
  onClick,
  dataTip,
  type = "button",
  children,
}) => {
  return (
    <button
      data-tip={dataTip}
      type={type}
      onClick={onClick}
      className="p-4 ml-3 shadow-md text-sm font-medium text-white bg-gradient-to-r from-primary to-secondary rounded-lg hover:opacity-70 hover:scale-105 transition-all"
    >
      {children}
    </button>
  );
};

export default SquareButton;
