"use client";
import avatar from "@/assets/images/webp/avater.webp";
import useWindowDimensions from "@/hook/getWindowDimensions";
import Image from "next/image";
import Link from "next/link";
import { ReactTyped } from "react-typed";
import Wave from "react-wavify";
import SocialBtn from "../../SocialBtn";
import socialBtnList from "./../../../utils/socialBtnList.json";
import Button from "./Button";
import { useTheme } from "next-themes";
import { BorderBeam } from "@/components/magicui/border-beam";
import { cn } from "@/lib/utils";
import AnimatedGridPattern from "@/components/magicui/animated-grid-pattern";
import GradualSpacing from "@/components/magicui/gradual-spacing";
import BoxReveal from "@/components/magicui/box-reveal";
import CvDropdownButton from "@/components/CvDropdownButton";

export default function Home() {
  const { height, width } = useWindowDimensions();

  const stats = [
    { value: "4+ Years", label: "Full-Stack Exp." },
    { value: "15+", label: "Production Apps" },
    { value: "Lead Reviewer", label: "@ Nascenia Ltd." },
    { value: "100%", label: "Client Satisfaction" },
  ];

  return (
    <div
      className={`lightBg dark:darkBg relative ${
        height > 694 && width > 992 && "min-h-screen"
      } overflow-hidden py-6 md:py-0 flex items-center justify-center`}
    >
      {/* Background Ambient Glow Orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/15 rounded-full blur-3xl pointer-events-none animate-pulse delay-1000"></div>

      <div className="w-full h-full background relative z-10">
        <div className="h-auto md:h-full pt-16 pb-8 md:py-12 containerCustom relative z-10">
          <div className="backdrop-blur-md bg-white/40 dark:bg-[#0b1327]/60 border border-gray-200/80 dark:border-[#192544] rounded-3xl h-full w-full relative overflow-hidden shadow-2xl">
            <div
              className={`flex items-center justify-center flex-col overflow-hidden h-full w-full relative z-20 pt-8 md:pt-12 pb-16 md:pb-20 px-4`}
            >
              {/* Status Badge */}
              <BoxReveal boxColor={"#0b1327"} duration={0.4}>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold mb-4 shadow-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span>Available for Senior Engineering & Architect Roles</span>
                </div>
              </BoxReveal>

              {/* Avatar with Glow Ring */}
              <div className="relative group mb-4">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 opacity-70 group-hover:opacity-100 blur transition-all duration-500 animate-tilt"></div>
                <div className="relative h-28 w-28 md:h-36 md:w-36 overflow-hidden rounded-full border-2 border-white dark:border-[#192544] bg-white shadow-xl transform transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src={avatar}
                    alt="Tahir's picture"
                    fill={true}
                    priority={true}
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Name */}
              <h2 className="text-3xl md:text-4xl font-medium pb-2 pt-1">
                <GradualSpacing
                  className="font-display text-center text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white md:text-4xl leading-[1.2] md:leading-[1.2]"
                  text={process.env.fullName}
                />
              </h2>

              {/* Typed Role */}
              <BoxReveal boxColor={"#0b1327"} duration={0.5}>
                <div className="font-medium">
                  <ReactTyped
                    strings={[
                      "Senior Full-Stack Software Engineer",
                      "Next.js 14 & React Specialist",
                      "Ruby on Rails Architect",
                      "Lead Code Reviewer @ Nascenia",
                      "AI System Integration Architect",
                    ]}
                    typeSpeed={70}
                    backSpeed={60}
                    loop
                    className="text-base md:text-xl font-semibold text-cyan-600 dark:text-cyan-400"
                  />
                </div>
              </BoxReveal>

              {/* Social Buttons */}
              <BoxReveal boxColor={"#0b1327"} duration={0.5}>
                <div className="icons mt-4 text-gray-600 dark:text-white/70 flex justify-center flex-wrap gap-1.5 p-2 bg-white/30 dark:bg-[#111c35]/40 rounded-2xl border border-gray-200/50 dark:border-[#1d2d55]/40">
                  {socialBtnList.map((btn, idx) => {
                    const { link, hover, icon } = btn || {};
                    return (
                      <span key={idx}>
                        <SocialBtn
                          key={idx}
                          link={link}
                          hover={hover}
                          icon={icon}
                        />
                      </span>
                    );
                  })}
                </div>
              </BoxReveal>

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-center gap-3.5 mt-5">
                <BoxReveal boxColor={"#0b1327"} duration={0.5}>
                  <Link href="/contact">
                    <Button name="Get in touch" />
                  </Link>
                </BoxReveal>
                <BoxReveal boxColor={"#0b1327"} duration={0.5}>
                  <CvDropdownButton buttonText="Download / Preview CV" />
                </BoxReveal>
              </div>

              {/* Quick Stats Horizontal Glass Bar */}
              <div className="mt-6 max-w-2xl w-full px-2">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-0 p-3.5 sm:p-4 rounded-3xl bg-white/60 dark:bg-[#111c35]/50 border border-gray-200/80 dark:border-[#1d2d55]/60 backdrop-blur-md shadow-xl">
                  {stats.map((item, index) => (
                    <div
                      key={index}
                      className="text-center px-2 py-1.5 sm:py-0 sm:border-r border-gray-200/60 dark:border-gray-800/80 last:border-r-0 flex flex-col justify-center items-center"
                    >
                      <div className="text-sm sm:text-base md:text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 whitespace-nowrap">
                        {item.value}
                      </div>
                      <div className="text-[10px] md:text-xs font-semibold text-gray-600 dark:text-gray-400 mt-0.5 whitespace-nowrap">
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Waves */}
            <Wave
              fill="#06b6d415"
              paused={false}
              options={{
                height: 45,
                amplitude: 45,
                speed: 0.15,
                points: 3,
              }}
              className="absolute bottom-0 z-10 pointer-events-none"
            />
            <Wave
              fill="#3b82f620"
              paused={false}
              options={{
                height: 60,
                amplitude: 30,
                speed: 0.2,
                points: 5,
              }}
              className="absolute bottom-0 z-10 pointer-events-none"
            />

            <BorderBeam
              size={500}
              duration={12}
              delay={9}
              className="z-[99999]"
            />
          </div>
        </div>
      </div>

      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.05}
        duration={1}
        repeatDelay={1}
        className={`${cn(
          "md:[mask-image:radial-gradient(700px_circle_at_center,white,transparent)] lg:[mask-image:radial-gradient(1100px_circle_at_center,white,transparent)] [mask-image:radial-gradient(350px_circle_at_center,white,transparent)] ",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
        )} opacity-90`}
      />
    </div>
  );
}
