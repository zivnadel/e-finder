import Link from "next/link";
import React from "react";
import { BsFacebook, BsGithub, BsLinkedin, BsTwitter } from "react-icons/bs";
import { Element } from "react-scroll";
import TransparentWrapper from "./wrappers/TransparentWrapper";

// a footer component to show about info and social links

const socialClasses =
  "text-white border-white h-14 w-14 cursor-pointer transition-all hover:opacity-70 hover:scale-105";

const Footer = () => {
  return (
    <Element
      as="footer"
      name="about"
      className="z-10 bg-gradient-to-r text-white from-gray-400 to-gray-800 flex flex-col p-10 gap-5 items-center justify-center"
    >
      <h2 className="drop-shadow-md text-5xl font-bold text-center">
        E-Finder
      </h2>
      <p className="text-lg text-center">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe sit
        veniam facere expedita, ex libero eos ab! Accusamus nesciunt expedita
        nostrum minus, iste perferendis eos vitae eaque quas quo animi dicta
        eligendi aspernatur dolorem possimus illo impedit blanditiis officia at
        ullam a qui nihil? Culpa explicabo libero a accusamus maxime deserunt
        aut, obcaecati natus odit asperiores impedit non quis, omnis ea hic?
        Inventore illo, ullam velit facilis aut expedita consectetur commodi
        cupiditate accusantium placeat eius labore iusto laboriosam eos
        perspiciatis a quasi autem harum, rem neque deleniti reiciendis
        veritatis, assumenda non. Modi natus, repudiandae qui aspernatur quos
        rem assumenda hic.
      </p>
      {/* Social Icons */}
      <div className="flex w-5/6 gap-3 items-center justify-center">
        <TransparentWrapper className={socialClasses}>
          <Link href="https://github.com/zivnadel">
            <BsGithub className="text-3xl" />
          </Link>
        </TransparentWrapper>
        <TransparentWrapper className={socialClasses}>
          <Link href="https://m.facebook.com/profile.php?id=100033417889631">
            <BsFacebook className="text-3xl" />
          </Link>
        </TransparentWrapper>
        <TransparentWrapper className={socialClasses}>
          <Link href="https://twitter.com/zivziv_">
            <BsTwitter className="text-3xl" />
          </Link>
        </TransparentWrapper>
      </div>
      <p className="text-sm italic">Ziv Nadel &copy; 2022</p>
    </Element>
  );
};

export default Footer;
