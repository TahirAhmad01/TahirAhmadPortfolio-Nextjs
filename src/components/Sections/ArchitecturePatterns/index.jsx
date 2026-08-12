"use client";
import Title from "../Title";
import { motion } from "framer-motion";
import { Layers, Server, Cpu, CheckCircle2 } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

const patternsData = [
  {
    icon: <Layers className="w-5 h-5 text-cyan-400" />,
    tag: "Next.js & Ruby on Rails",
    title: "Full-Stack Web Architecture (Clean & Modular)",
    bullets: [
      "Front-End: Next.js App Router with Server-Side Rendering (SSR), Framer Motion animations, and Tailwind CSS.",
      "Back-End: Ruby on Rails MVC pattern with RESTful APIs, PostgreSQL schema design, and Redis caching."
    ],
    productionApps: ["Uddogi", "Dojoteq", "Decofetch"]
  },
  {
    icon: <Server className="w-5 h-5 text-purple-400" />,
    tag: "REST APIs & RTK Query",
    title: "Resilient Networking & API Client Layer",
    bullets: [
      "State Management: RTK Query & Redux Toolkit for caching, optimistic updates, and instant data re-fetching.",
      "Integrations: Multi-gateway payments (Stripe & PayPal), live WebSocket connections, and OAuth authentication."
    ],
    productionApps: ["Decofetch", "Doodl Space", "Dojoteq"]
  },
  {
    icon: <Cpu className="w-5 h-5 text-blue-400" />,
    tag: "Gemini API & MCP Tooling",
    title: "AI Agents & Automation Systems",
    bullets: [
      "MCP Orchestration: Model Context Protocol (MCP) servers enabling LLMs to safely query databases and execute tools.",
      "Gemini AI Integration: System prompt design, context injection, and real-time streaming AI chat handlers."
    ],
    productionApps: ["Tahir AI Assistant", "VAT Automation"]
  }
];

export default function ArchitecturePatterns() {
  return (
    <div className="containerCustom gap">
      <Title title="architecture" titleDes="Verified architectural patterns applied in production mobile & web applications" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8"
      >
        {patternsData.map((item, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            className="p-6 bg-white dark:bg-[#111c35]/40 border border-gray-200/60 dark:border-[#1d2d55]/40 rounded-2xl shadow-sm hover:shadow-[0_0_20px_rgba(6,182,212,0.08)] hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              {/* Header Badge & Icon */}
              <div className="flex items-center justify-between gap-2">
                <div className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-[#1e293b]/70 border border-gray-200 dark:border-gray-800 flex items-center justify-center">
                  {item.icon}
                </div>
                <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                  {item.tag}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-base md:text-lg font-bold text-gray-800 dark:text-gray-100 mt-4 mb-3 group-hover:text-cyan-500 transition-colors">
                {item.title}
              </h3>

              {/* Bullets */}
              <div className="space-y-2.5 my-4">
                {item.bullets.map((bullet, bIdx) => (
                  <div key={bIdx} className="flex items-start gap-2.5 text-xs md:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Production Apps */}
            <div className="pt-4 border-t border-gray-100 dark:border-gray-800/80 mt-2">
              <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase block mb-2">
                Applied In Production:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {item.productionApps.map((app, aIdx) => (
                  <span
                    key={aIdx}
                    className="text-xs px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-[#1e293b]/80 text-gray-700 dark:text-gray-300 border border-gray-200/50 dark:border-gray-800 font-medium"
                  >
                    {app}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
