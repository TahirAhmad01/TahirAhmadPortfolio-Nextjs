"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function VisitorCounter() {
  const [visitCount, setVisitCount] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const hasVisited = sessionStorage.getItem("portfolio_visited");

    const fetchCount = () => {
      axios
        .get("/api/visitors")
        .then((res) => {
          setVisitCount(res.data.count);
        })
        .catch((err) => {
          console.error("Failed to fetch visitor count:", err);
        });
    };

    if (!hasVisited) {
      axios
        .post("/api/visitors", { increment: true })
        .then((res) => {
          setVisitCount(res.data.count);
          sessionStorage.setItem("portfolio_visited", "true");
        })
        .catch((err) => {
          console.error("Failed to increment visitor count:", err);
          fetchCount();
        });
    } else {
      fetchCount();
    }
  }, []);

  if (visitCount === null) {
    return (
      <div className="inline-flex items-center gap-2 bg-gray-200/40 dark:bg-gray-800/40 px-3 py-1 rounded-full text-xs font-medium text-gray-500 dark:text-gray-400 border border-gray-300/20 dark:border-gray-755/20 shadow-sm animate-pulse">
        <span className="h-2 w-2 rounded-full bg-gray-400"></span>
        <span>Loading visits...</span>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-2 bg-white/40 dark:bg-gray-900/40 px-3 py-1.5 rounded-full text-xs font-medium text-gray-600 dark:text-gray-300 border border-gray-300/30 dark:border-gray-700/30 shadow-sm backdrop-blur-sm transition-all duration-300 hover:scale-105 select-none">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
      </span>
      <span>
        Total Visits:{" "}
        <span className="font-bold text-gray-900 dark:text-white">
          {visitCount.toLocaleString()}
        </span>
      </span>
    </div>
  );
}
