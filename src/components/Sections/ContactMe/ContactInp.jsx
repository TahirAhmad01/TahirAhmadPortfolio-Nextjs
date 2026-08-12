import React from "react";
import { Fade } from "react-reveal";

export default function ContactInp({ delay, type, placeholder, ...rest }) {
  return (
    <Fade up delay={delay}>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-xl bg-gray-50 dark:bg-[#16223b]/80 border border-gray-200/80 dark:border-[#1e2d4a] p-3.5 text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400 focus:ring-1 focus:ring-cyan-500 transition-all shadow-sm"
        {...rest}
      />
    </Fade>
  );
}
