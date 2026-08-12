"use client";
import Title from "../Title";
import { motion } from "framer-motion";
import { ExternalLink, FolderGit2, Star, ChevronRight } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { y: 15, opacity: 0 },
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

const featuredRepos = [
  {
    name: "TahirAhmadPorfolio-Nextjs",
    lang: "JavaScript",
    langColor: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    description: "Modern developer portfolio & AI system assistant built with Next.js 14, React 18, and Tailwind CSS.",
    stars: 5,
    link: "https://github.com/TahirAhmad01/TahirAhmadPorfolio-Nextjs"
  },
  {
    name: "CourseManagementApplication-ROR",
    lang: "Ruby",
    langColor: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
    description: "Full-featured university course registration & CGPA system built with Ruby on Rails and RSpec.",
    stars: 4,
    link: "https://github.com/TahirAhmad01/CourseManagementApplication-ROR"
  },
  {
    name: "ChatApplicationWithRtkQuery",
    lang: "React",
    langColor: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20",
    description: "Real-time chat application built using React, Redux Toolkit Query, and WebSockets.",
    stars: 4,
    link: "https://github.com/TahirAhmad01/ChatApplicationWithRtkQuery"
  }
];

export default function GithubActivity() {
  return (
    <div className="containerCustom gap">
      <Title title="github" titleDes="GitHub Open Source Activity" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-8 mt-8"
      >
        {/* Featured Repositories Header & Grid */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <i className="fa-brands fa-github text-xl text-gray-800 dark:text-gray-100"></i>
                <h3 className="text-lg md:text-xl font-bold text-gray-800 dark:text-gray-100">
                  Featured Repositories
                </h3>
              </div>
              <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1">
                Featured open-source web, Rails & Next.js repositories
              </p>
            </div>
            <a
              href="https://github.com/TahirAhmad01"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-[#1e293b]/80 dark:hover:bg-[#1e293b] text-gray-800 dark:text-gray-200 rounded-xl text-xs md:text-sm font-semibold border border-gray-200/80 dark:border-gray-800 transition-all self-start sm:self-auto hover:scale-105"
            >
              <span>View GitHub Profile</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Repo Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredRepos.map((repo, idx) => (
              <motion.a
                key={idx}
                href={repo.link}
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants}
                className="p-5 bg-white dark:bg-[#111c35]/40 border border-gray-200/60 dark:border-[#1d2d55]/40 rounded-2xl shadow-sm hover:shadow-[0_0_20px_rgba(6,182,212,0.08)] hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2 min-w-0 pr-1">
                      <FolderGit2 className="w-4 h-4 text-cyan-500 flex-shrink-0" />
                      <span className="font-bold text-sm text-gray-800 dark:text-gray-100 truncate group-hover:text-cyan-500 transition-colors">
                        {repo.name}
                      </span>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${repo.langColor}`}>
                      {repo.lang}
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
                    {repo.description}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 pt-4 mt-3 border-t border-gray-100 dark:border-gray-800/80">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      {repo.stars}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                      Public
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
