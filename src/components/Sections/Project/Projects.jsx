"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import blur from "@/assets/images/webp/blur.webp";
import ProjectModal from "./ProjectModal";

export default function Projects({ item, isGridView, key }) {
  const [open, setOpen] = useState(false);
  const [projectId, setProjectId] = useState("");
  const handleOpen = (id) => {
    setOpen(true);
    setProjectId(id);
  };
  const { id, imageSrc, placeholderSrc, name, category, description } =
    item || {};

  return (
    <>
      <motion.div
        layout
        initial={{
          opacity: 0,
          transform: "scale(0.7)"
        }}
        animate={{ opacity: 1, transform: "scale(1)" }}
        exit={{
          opacity: 0,
          transform: "scale(0.7)"
        }}
        transition={{ duration: 0.5 }}
        key={key}
      >
        <div
          className={`relative projectBtn object-contain overflow-hidden hover:cursor-pointer w-full min-h-24 ${!isGridView && " flex items-center gap-3"}`}
          onClick={() => handleOpen(id)}
        >
          <div
            className={`${isGridView ? "w-full h-64 sm:h-52 lg:h-56 " : "w-60 h-24 md:h-32 rounded-md overflow-hidden"}`}
          >
            <LazyLoadImage
              src={imageSrc}
              placeholderSrc={placeholderSrc ? placeholderSrc : blur}
              threshold="100"
              alt={name}
              effect="blur"
              height="100%"
              width="100%"
              className={`object-cover min-h-full block w-full`}
              loading="lazy"
            />
          </div>
          {isGridView ? (
            <div className="absolute bg-white/80 backdrop-blur  h-[80px] w-full -bottom-full left-0 z-30 md:flex justify-center items-center slide-up transition-all ease-in-out duration-500 dark:text-black hidden">
              <div>
                <div className="font-semibold capitalize text-base text-center">
                  {name}
                </div>
                <div className="text-center text-sm">
                  {category?.map((cat, idx) => (
                    <span key={idx}>{(idx ? ", " : "") + cat}</span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full">
              <div className="font-semibold capitalize">{name}</div>
              <div className="text-xs line-clamp-3 mb-2 text-gray-700 dark:text-gray-400">
                {description}
              </div>
              <div className="text-sm">
                {category?.map((cat, idx) => (
                  <>
                    <div
                      className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300 capitalize md:inline-block hidden shadow-md"
                      key={idx}
                    >
                      {cat}
                    </div>
                  </>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>

      <ProjectModal
        open={open}
        handleOpen={handleOpen}
        setOpen={setOpen}
        projectId={projectId}
      />
    </>
  );
}
