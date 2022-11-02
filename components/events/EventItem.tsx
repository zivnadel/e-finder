import React from "react";

// component representing an event in the grid

const Event: React.FC = () => {
  return (
    <div className="font-quicksand flex flex-col opacity-60 shadow-xl p-5 rounded-lg transition-all hover:opacity-100 hover:scale-105">
      <img
        className="rounded-lg mb-4"
        src="https://images.unsplash.com/photo-1657123785290-ee2ad4b80303?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
        alt="Event Image"
      />
      <h1 className="text-2xl font-bold">Lorem ipsum dolor</h1>
      <p className="text-gray-500">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque
        dolor numquam unde iusto tempore omnis nobis? Ullam expedita nisi sequi?
      </p>
    </div>
  );
};

export default Event;
