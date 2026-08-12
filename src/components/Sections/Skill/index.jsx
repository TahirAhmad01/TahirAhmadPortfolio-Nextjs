"use client";
import skillsList from "@/utils/skillsList.json";
import Title from "../Title";
import Image from "next/image";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
    },
  },
};

const itemVariants = {
  hidden: { y: 10, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

export default function Skill() {
  const getLevelBorderClass = (position) => {
    const pos = position?.toLowerCase();
    if (pos === "expert") {
      return "hover:border-cyan-500/50 dark:hover:border-cyan-400/50 hover:shadow-[0_0_10px_rgba(6,182,212,0.15)]";
    }
    if (pos === "junior") {
      return "hover:border-amber-500/50 dark:hover:border-amber-400/50 hover:shadow-[0_0_10px_rgba(245,158,11,0.15)]";
    }
    return "hover:border-purple-500/50 dark:hover:border-purple-400/50 hover:shadow-[0_0_10px_rgba(168,85,247,0.15)]";
  };

  return (
    <>
      <div className="containerCustom gap">
        <Title title="skill" titleDes="Skills acquired over the years" />

        {skillsList?.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8"
          >
            {skillsList.map((category, catIdx) => {
              const { name, list } = category;
              return (
                <motion.div
                  key={catIdx}
                  variants={itemVariants}
                  className="p-6 bg-white dark:bg-[#1f2937]/50 border border-gray-200/80 dark:border-[#2d3748]/70 rounded-2xl shadow-sm hover:shadow-[0_0_20px_rgba(6,182,212,0.05)] transition-all duration-300 flex flex-col justify-start"
                >
                  {/* Category Header */}
                  <div className="border-l-4 border-cyan-500 dark:border-cyan-400 pl-3 mb-5">
                    <h2 className="text-base md:text-lg font-bold text-gray-800 dark:text-gray-100 capitalize">
                      {name}
                    </h2>
                  </div>

                  {/* Skills Tag Cloud */}
                  <div className="flex flex-wrap gap-2.5">
                    {list?.map((skill, skillIdx) => {
                      const { name: skillName, icon, position } = skill || {};
                      const isBlackIcon = 
                        skillName.toLowerCase().includes("github") || 
                        skillName.toLowerCase().includes("next.js") || 
                        skillName.toLowerCase().includes("nextjs");
                      return (
                        <div
                          key={skillIdx}
                          className={`inline-flex items-center px-3.5 py-2 bg-gray-50/90 hover:bg-gray-100 dark:bg-[#111c30]/65 dark:hover:bg-[#111c30]/90 border border-gray-200/80 dark:border-[#1e2d4a]/80 rounded-full text-xs md:text-sm font-medium text-gray-700 dark:text-gray-200 transition-all duration-200 hover:-translate-y-0.5 ${getLevelBorderClass(
                            position
                          )}`}
                          title={`Level: ${position}`}
                        >
                          {/* Skill Icon */}
                          <Image
                            src={
                              icon ||
                              "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
                            }
                            alt={`${skillName} icon`}
                            className={`w-4 h-4 object-contain mr-2 ${isBlackIcon ? "dark:invert" : ""}`}
                            height={16}
                            width={16}
                            unoptimized
                          />
                          {skillName}
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </>
  );
}
