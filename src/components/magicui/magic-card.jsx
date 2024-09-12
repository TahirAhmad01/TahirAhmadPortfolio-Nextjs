"use client";
import React, { useCallback, useEffect } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  animate,
} from "framer-motion";

import { cn } from "@/lib/utils";

export function MagicCard({
  children,
  className,
  gradientSize = 250,
  gradientColor = "#dfe6e9",
  gradientOpacity = 0.8,
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = useCallback(
    (e) => {
      const { left, top } = e.currentTarget.getBoundingClientRect();
      mouseX.set(e.clientX - left);
      mouseY.set(e.clientY - top);
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    animate(mouseX, 90, { duration: .5 });
    animate(mouseY, 20, { duration: .5 });
  }, [mouseX, mouseY]);

  useEffect(() => {
    animate(mouseX, 90);
    animate(mouseY, 20);
  }, [mouseX, mouseY]);

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "group relative flex size-full overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-900 border text-black dark:text-white transition-all duration-200",
        className
      )}
    >
      <div className="relative z-10 w-full break-words">{children}</div>
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px, ${gradientColor}, transparent 100%)
          `,
          opacity: gradientOpacity,
        }}
      />
    </div>
  );
}
