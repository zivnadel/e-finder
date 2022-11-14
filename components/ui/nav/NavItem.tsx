import { Link, animateScroll } from "react-scroll";
import React from "react";
import { twMerge } from "tailwind-merge";
import { useRouter } from "next/router";

interface Props {
  href: string;
  children: React.ReactNode;
  className?: string;
}

// component that wraps the next/link component for nav itemss

const NavItem: React.FC<Props> = ({ href, children, className }) => {
  const router = useRouter();

  // if not in home page, move to home page and scroll
  const navItemClickedHandler = async () => {
    if (router.pathname !== "/") {
      await router.push("/");

      if (href === "events") {
        animateScroll.scrollTo(750, {
          duration: 1000,
          delay: 0,
          smooth: true,
        });
      }
    }
  };

  return (
    <div className="cursor-pointer transition-all hover:opacity-70">
      <Link
        smooth
        onClick={navItemClickedHandler}
        to={href}
        className={twMerge(
          `drop-shadow-md text-primary text-3xl md:text-4xl font-bold ${className}`
        )}
      >
        {children}
      </Link>
    </div>
  );
};

export default NavItem;
