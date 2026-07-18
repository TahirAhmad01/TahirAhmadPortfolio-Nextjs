"use client";

import { useEffect, useState } from "react";
import socialBtnList from "../utils/socialBtnList.json";
import SocialBtn from "./SocialBtn";
import VisitorCounter from "./VisitorCounter";

export default function Footer() {
  const [isQubartech, setIsQubartech] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsQubartech(window.location.hostname.includes("qubartech.com"));
    }
  }, []);

  return (
    <>
      <footer className="bg-gray-100 border-t-1 border-gray-300 dark:border-gray-700 rounded-sm shadow dark:bg-gray-800">
        <div className="lg:flex lg:items-center lg:justify-between text-center p-5 lg:p-2 containerCustom gap-4">
          <span className="text-sm text-gray-500 lg:text-center dark:text-gray-400">
            © {"2022 - " + new Date().getFullYear()}{" "}
            {isQubartech ? (
              <>
                <a href="https://Qubartech.com/" className="hover:underline font-semibold">
                  Qubartech
                </a>
                . Design & Maintenance by{" "}
                <a
                  href="https://tahirahmad.vercel.app/"
                  target="_blank"
                  className="hover:underline font-semibold"
                >
                  Tahir Ahmad
                </a>
              </>
            ) : (
              <a
                href="https://tahirahmad.vercel.app/"
                target="_blank"
                className="hover:underline font-semibold"
              >
                Tahir Ahmad
              </a>
            )}
            .
          </span>

          <div className="icons text-gray-600 dark:text-white/60 flex justify-center flex-wrap mt-2 lg:mt-0">
            {socialBtnList.map((btn, idx) => {
              const { link, hover, icon } = btn || {};
              return (
                <SocialBtn
                  key={idx}
                  link={link}
                  hover={`${hover}`}
                  icon={icon}
                />
              );
            })}
          </div>
        </div>
      </footer>
    </>
  );
}
