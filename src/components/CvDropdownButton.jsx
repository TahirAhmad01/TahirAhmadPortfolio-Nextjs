"use client";
import { useState, useRef, useEffect } from "react";

export default function CvDropdownButton({
  pdfPath = "/pdf/Tahir_Ahmad_Software_Engineer_CV.pdf",
  fileName = "Tahir_Ahmad_Software_Engineer_CV.pdf",
  buttonText = "CV / Resume"
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left z-50" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 hover:bg-gradient-to-bl font-semibold rounded-3xl text-sm px-6 py-3.5 text-center text-white inline-flex items-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none cursor-pointer"
      >
        <span>{buttonText}</span>
        <i className={`fa-solid fa-chevron-down text-xs transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}></i>
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-52 rounded-2xl bg-white dark:bg-[#111c35] border border-gray-200 dark:border-[#1d2d55] shadow-2xl py-2 z-[100]">
          <a
            href={pdfPath}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-[#1e293b] transition-colors"
          >
            <i className="fa-solid fa-eye text-cyan-500 text-base w-4 text-center"></i>
            <span>Preview CV</span>
          </a>
          <a
            href={pdfPath}
            download={fileName}
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-[#1e293b] transition-colors border-t border-gray-100 dark:border-gray-800/80"
          >
            <i className="fa-solid fa-download text-emerald-500 text-base w-4 text-center"></i>
            <span>Download CV</span>
          </a>
        </div>
      )}
    </div>
  );
}
