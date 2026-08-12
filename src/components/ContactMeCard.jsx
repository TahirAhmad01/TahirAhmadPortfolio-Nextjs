"use client";
import { useTheme } from "next-themes";

import { MagicCard } from "@/components/magicui/magic-card";
import ShineBorder from "./magicui/shine-border";
import Link from "next/link";
import BoxReveal from "./magicui/box-reveal";

export function ContactMeCard() {
  const { theme } = useTheme();
  return (
    <div className={"pb-[55px] containerCustom max-w-[700px]"}>
      <ShineBorder
        className="flex w-full flex-col items-center justify-center overflow-hidden rounded-2xl bg-white dark:bg-[#111c35]/60 border border-gray-200/60 dark:border-[#1d2d55]/40 shadow-xl p-0 h-auto"
        color={["#06b6d4", "#3b82f6", "#8b5cf6"]}
      >
        <MagicCard
          className="cursor-pointer shadow-2xl w-full border-none py-6 md:py-8 px-4 md:px-6 break-words rounded-2xl"
          gradientColor={theme === "dark" ? "#06b6d420" : "#3b82f615"}
        >
          <div className="flex flex-col gap-4 items-center">
            <div className="flex flex-col items-center space-y-1.5">
              <BoxReveal boxColor={"#06b6d4"} duration={0.5}>
                <div className="font-bold text-lg md:text-2xl text-center text-gray-800 dark:text-gray-100">
                  Do you want to know more or have any queries?
                </div>
              </BoxReveal>
              <BoxReveal boxColor={"#06b6d4"} duration={0.5}>
                <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400 text-center max-w-md">
                  Feel free to reach out directly. I would love to hear from you and reply as soon as possible.
                </div>
              </BoxReveal>
            </div>

            <BoxReveal boxColor={"#06b6d4"} duration={0.5}>
              <Link href="/contact">
                <button
                  type="button"
                  className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 font-bold rounded-xl text-sm px-8 py-3.5 text-center text-white transition-all shadow-md hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:scale-105 flex items-center justify-center gap-2"
                >
                  <i className="fa-solid fa-paper-plane text-xs"></i>
                  <span>Contact Me Now</span>
                </button>
              </Link>
            </BoxReveal>
          </div>
        </MagicCard>
      </ShineBorder>
    </div>
  );
}
