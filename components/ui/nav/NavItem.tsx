import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  href: string;
  children: React.ReactNode;
  className?: string;
}

// component that wraps the next/link component for nav itemss

const NavItem: React.FC<Props> = ({ href, children, className }) => {
  return (
    <div className="mx-8 transition-all hover:opacity-70">
      <Link
        className={twMerge(
          `drop-shadow-md text-primary text-4xl font-quicksand font-bold ${className}`
        )}
        href={href}
      >
        {children}
      </Link>
    </div>
  );
};

export default NavItem;
