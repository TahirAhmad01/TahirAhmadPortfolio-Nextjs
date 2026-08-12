import React from "react";

export default function Title({ title, titleDes, className = "" }) {
  return (
    <div className={`text-center mb-14 md:mb-16 relative z-10 ${className}`}>
      {/* Accent Pill Badge */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 dark:bg-cyan-500/15 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></span>
        <span>{title || "Section"}</span>
      </div>

      {/* Main Title */}
      <h2 className="text-3xl md:text-4xl font-extrabold uppercase tracking-tight">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 drop-shadow-sm">
          {title || "Title"}
        </span>
      </h2>

      {/* Subtitle / Description */}
      {titleDes && (
        <p className="mt-2 text-xs md:text-sm text-gray-600 dark:text-gray-400 max-w-lg mx-auto leading-relaxed">
          {titleDes}
        </p>
      )}

      {/* Subtle Gradient Line Accent */}
      <div className="mt-4 flex justify-center items-center gap-1">
        <div className="w-8 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-blue-500 rounded-full"></div>
        <div className="w-2 h-[2px] bg-purple-500 rounded-full"></div>
        <div className="w-8 h-[2px] bg-gradient-to-r from-purple-500 via-blue-500 to-transparent rounded-full"></div>
      </div>
    </div>
  );
}

