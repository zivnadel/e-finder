import React from "react";

interface Props {
  error: string;
  full?: boolean;
}

// a component that displays an error message
// it is a section in the site, as a placeholder for the content

const ErrorSection: React.FC<Props> = ({ error, full = false }) => {
  return (
    <section
      className={`bg-gradient-to-r from-red-500/40 to-red-800/40 w-full py-3 px-1 md:p-0 ${
        full ? "min-h-screen" : "min-h-[50vh]"
      } flex flex-col items-center justify-center text-center`}
    >
      <h1 className="font-bold text-6xl drop-shadow-md">An error occurred!</h1>
      <div className="max-w-[50%] text-center bg-white/70 p-3 my-4 rounded-xl shadow-lg">
        <p className="text-black font-semibold text-3xl drop-shadow-md">
          {error}
        </p>
      </div>
      <p className="text-xl">Refresh the page or try again later.</p>
    </section>
  );
};

export default ErrorSection;
