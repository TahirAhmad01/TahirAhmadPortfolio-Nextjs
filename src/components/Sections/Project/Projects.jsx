"use client";
import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import blur from "@/assets/images/webp/blur.webp";
import ProjectSlide from "./ProjectSlide";
import classnames from "classnames";

export default function Projects({ item, isGridView, path }) {
  const [open, setOpen] = useState(false);
  const [projectId, setProjectId] = useState("");

  const handleOpen = (id) => {
    setOpen(true);
    setProjectId(id);
  };

  const {
    id = "",
    imageSrc = [],
    placeholderSrc = blur,
    name = "Unknown Project",
    category = [],
    description = "No description available.",
  } = item || {};

  return (
    <>
      <div
        className={classnames(
          "relative projectBtn overflow-hidden hover:cursor-pointer w-full rounded-2xl border border-gray-200/70 dark:border-[#1d2d55]/50 bg-white/70 dark:bg-[#111c35]/40 backdrop-blur-md shadow-sm group hover:border-cyan-500/50 hover:shadow-[0_0_25px_rgba(6,182,212,0.12)] transition-all duration-300",
          {
            "flex items-center gap-4 p-3": !isGridView && path !== "/",
          }
        )}
        onClick={() => handleOpen(id)}
      >
        <div
          className={classnames(
            "overflow-hidden relative",
            path === "/" || isGridView
              ? "w-full h-64 sm:h-56 lg:h-60 rounded-2xl"
              : "w-48 sm:w-60 h-28 md:h-32 rounded-xl flex-shrink-0"
          )}
        >
          <LazyLoadImage
            src={imageSrc[0] || placeholderSrc}
            placeholderSrc={placeholderSrc}
            threshold="100"
            alt={name}
            effect="blur"
            height="100%"
            width="100%"
            className="object-cover min-h-full block w-full transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        </div>

        {path === "/" || isGridView ? (
          <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent backdrop-blur-sm transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 flex flex-col justify-end text-white">
            <div className="font-bold capitalize text-base md:text-lg tracking-wide text-white drop-shadow">
              {name}
            </div>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {category.map((cat, idx) => (
                <span
                  key={idx}
                  className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 backdrop-blur-md capitalize"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <div className="w-full pr-2">
            <div className="font-extrabold capitalize text-base text-gray-800 dark:text-gray-100 group-hover:text-cyan-500 transition-colors line-clamp-1">
              {name}
            </div>
            <div className="text-xs line-clamp-2 my-1.5 text-gray-600 dark:text-gray-400 leading-relaxed">
              {description}
            </div>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {category.map((cat, idx) => (
                <span
                  className="bg-gray-100 dark:bg-[#1e293b] text-gray-700 dark:text-gray-300 text-[10px] font-semibold px-2.5 py-0.5 rounded-full border border-gray-200 dark:border-gray-800 capitalize"
                  key={idx}
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <ProjectSlide
        open={open}
        handleOpen={handleOpen}
        setOpen={setOpen}
        projectId={projectId}
      />
    </>
  );
}
