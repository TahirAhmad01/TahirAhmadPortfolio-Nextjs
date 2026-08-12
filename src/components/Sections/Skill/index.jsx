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
    if (pos === "expert" || pos === "senior") {
      return "hover:border-cyan-500/60 dark:hover:border-cyan-400/60 hover:shadow-[0_0_12px_rgba(6,182,212,0.2)]";
    }
    if (pos === "junior" || pos === "beginner") {
      return "hover:border-amber-500/60 dark:hover:border-amber-400/60 hover:shadow-[0_0_12px_rgba(245,158,11,0.2)]";
    }
    return "hover:border-purple-500/60 dark:hover:border-purple-400/60 hover:shadow-[0_0_12px_rgba(168,85,247,0.2)]";
  };

  return (
    <div className="containerCustom gap">
      <Title title="skills & stack" titleDes="Core technologies, frameworks, tools, & databases I work with daily" />

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
                className="p-6 bg-white/70 dark:bg-[#111c35]/40 backdrop-blur-md border border-gray-200/80 dark:border-[#1d2d55]/50 rounded-3xl shadow-sm hover:shadow-[0_0_25px_rgba(6,182,212,0.08)] hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-start group"
              >
                {/* Category Header */}
                <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-gray-100 dark:border-gray-800/80">
                  <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 group-hover:scale-125 transition-transform"></div>
                  <h3 className="text-base md:text-lg font-extrabold text-gray-800 dark:text-gray-100 capitalize tracking-wide">
                    {name}
                  </h3>
                  <span className="ml-auto text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-gray-100 dark:bg-[#1e293b] text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-800">
                    {list?.length || 0} Skills
                  </span>
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
                        className={`inline-flex items-center px-3.5 py-2 bg-white/80 dark:bg-[#0b1327]/60 hover:bg-gray-50 dark:hover:bg-[#111c30] border border-gray-200/80 dark:border-[#1e2d4a]/80 rounded-2xl text-xs md:text-sm font-semibold text-gray-700 dark:text-gray-200 transition-all duration-200 hover:-translate-y-0.5 shadow-sm ${getLevelBorderClass(
                          position
                        )}`}
                        title={`Proficiency: ${position || "Proficient"}`}
                      >
                        {/* Skill Icon */}
                        <Image
                          src={
                            icon ||
                            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
                          }
                          alt={`${skillName} icon`}
                          className={`w-4 h-4 object-contain mr-2 ${
                            isBlackIcon ? "dark:invert" : ""
                          }`}
                          height={16}
                          width={16}
                          unoptimized
                        />
                        <span>{skillName}</span>
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
  );
}
