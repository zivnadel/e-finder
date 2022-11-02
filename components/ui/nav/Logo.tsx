import Link from "next/link";
import React from "react";

// a component for the logo in  he navbar

const Logo: React.FC = () => {
  return (
    <div className="transition-all hover:scale-125">
      <Link
        href="/"
        className="font-quicksand drop-shadow-md text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary"
      >
        E
      </Link>
    </div>
  );
};

export default Logo;
