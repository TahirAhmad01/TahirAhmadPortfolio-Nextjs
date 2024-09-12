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
        className=" flex w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-90 md:shadow-xl p-0 bg-transparent h-auto"
        color={
          theme === "dark"
            ? ["#ecf0f1", "#bdc3c7", "#95a5a6"]
            : ["#7f8c8d", "#7f8c8d", "#95a5a6"]
        }
      >
        <MagicCard
          className="cursor-pointer shadow-2xl w-full border-none py-5 md:py-7 px-3 md:px-4 break-words rounded-[14px]"
          gradientColor={theme === "dark" ? "#ecf0f122" : "#2c3e5025"}
        >
          <div className=" flex flex-col gap-3 items-center">
            <div className="flex flex-col justify-center items-center">
              <BoxReveal boxColor={"#0b1327"} duration={0.5}>
                <div className="font-semibold text-md md:text-xl">
                  Do you want to know more or have any queries?
                </div>
              </BoxReveal>
              <BoxReveal boxColor={"#0b1327"} duration={0.5}>
                <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                  Feel free to contact me. I would love to hear from you and
                  respond as soon as possible.
                </div>
              </BoxReveal>
            </div>

            <BoxReveal boxColor={"#0b1327"} duration={0.5}>
              <Link href="/contact">
                <button
                  type="button"
                  className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 hover:bg-gradient-to-bl font-medium rounded-3xl text-sm px-12 md:hover:px-16 py-3 text-center mr-2 mb-2 text-white transition-all flex items-center justify-center"
                >
                  Contact Me
                </button>
              </Link>
            </BoxReveal>
          </div>
        </MagicCard>
      </ShineBorder>
    </div>
  );
}
