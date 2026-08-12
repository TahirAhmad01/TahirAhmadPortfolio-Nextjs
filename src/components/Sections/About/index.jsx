"use client";
import aboutInfo from "@/utils/about";
import Image from "next/image";
import { Fade, Zoom } from "react-reveal";
import picture from "@/assets/images/jpg/myPic.jpg";
import Title from "../Title";
import Info from "./Info";

export default function About() {
  const { heading, description, information } = aboutInfo || {};

  return (
    <div className="flex items-center flex-wrap relative">
      <div className="containerCustom gap overflow-hidden">
        <Title title="about me" titleDes="Get to know my journey, stack, & experience" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center mt-6">
          {/* Text & Specs Column */}
          <div className="md:col-span-7 lg:col-span-7 flex flex-col justify-between">
            <Fade up cascade>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
                  {heading}
                </span>
              </h3>
              <div className="text-xs md:text-sm text-gray-600 dark:text-gray-300 flex flex-col gap-3 leading-relaxed text-justify">
                {description?.split("\n").map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                {information?.map((info, idx) => {
                  const { name, details } = info || {};
                  return <Info name={name} details={details} key={idx} />;
                })}
              </div>
            </Fade>
          </div>

          {/* Picture & Floating Badge Column */}
          <div className="md:col-span-5 lg:col-span-5 flex justify-center">
            <Zoom>
              <div className="relative group max-w-sm w-full">
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 opacity-30 group-hover:opacity-60 blur-xl transition-all duration-500"></div>
                <div className="relative overflow-hidden rounded-2xl border border-gray-200/80 dark:border-[#1d2d55]/60 shadow-2xl bg-white/40 dark:bg-[#111c35]/40 backdrop-blur-md aspect-[4/4]">
                  <Image
                    fill
                    priority
                    src={picture}
                    alt="Tahir's image"
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Floating Badge */}
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-white/80 dark:bg-[#0b1327]/80 backdrop-blur-md border border-white/20 dark:border-[#192544] shadow-lg flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-gray-900 dark:text-white">
                        Tahir Ahmad
                      </div>
                      <div className="text-[10px] font-medium text-cyan-600 dark:text-cyan-400">
                        Senior Software Engineer
                      </div>
                    </div>
                    <span className="px-2 py-1 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-[10px] font-bold border border-cyan-500/20">
                      Nascenia Ltd.
                    </span>
                  </div>
                </div>
              </div>
            </Zoom>
          </div>
        </div>
      </div>
    </div>
  );
}

