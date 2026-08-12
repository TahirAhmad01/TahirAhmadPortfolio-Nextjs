import React from "react";

export default function Info({ name, details }) {
  return (
    <div className="flex items-center justify-between p-2.5 px-3.5 rounded-xl bg-white/60 dark:bg-[#111c35]/50 border border-gray-200/70 dark:border-[#1d2d55]/50 shadow-sm transition-all hover:border-cyan-500/30">
      <span className="text-xs font-semibold capitalize text-gray-500 dark:text-gray-400">
        {name}
      </span>
      <span className="text-xs md:text-sm font-bold text-gray-800 dark:text-gray-100 truncate max-w-[200px] sm:max-w-[280px]">
        {details}
      </span>
    </div>
  );
}

