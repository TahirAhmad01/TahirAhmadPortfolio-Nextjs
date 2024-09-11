"use client";
import avatar from "@/assets/images/avater.webp";
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

export default function Home() {
  const { height, width } = useWindowDimensions();
  const { theme } = useTheme();

  return (
    <div
      className={`lightBg dark:darkBg relative ${height > 694 && width > 992 && "h-screen"} overflow-hidden`}
    >
      <div className="w-full h-full background">
        <div className="h-auto md:h-full pt-24 py-8 containerCustom relative z-10">
          <div className="backdrop-blur-sm bg-white/10 dark:bg-[#0b1327]/20 border dark:border-[#192544] rounded-2xl h-full w-full relative overflow-hidden">
            <div
              className={`flex items-center justify-center flex-col overflow-hidden h-full w-full relative z-20 pt-20 md:pb-28 pb-32`}
            >
              <div className="relative h-28 w-28 md:h-36 md:w-36 overflow-hidden rounded-full bg-white mb-4">
                <Image src={avatar} alt="avatar" fill={true} priority={true} />
              </div>
              <h2 className="text-3xl md:text-4xl font-medium pb-4 pt-2 ">
                <GradualSpacing
                  className="font-display text-center text-2xl font-bold tracking-[-0.1em]  text-black dark:text-white md:text-3xl leading-[1rem] md:leading-[2rem]"
                  text={process.env.fullName}
                />
              </h2>{" "}
              <BoxReveal boxColor={"#0b1327"} duration={0.5}>
                <ReactTyped
                  strings={[
                    "Full-stack Web Developer",
                    "Javascript Developer",
                    "React Developer",
                    "Ruby Developer",
                    "Web Designer",
                  ]}
                  typeSpeed={90}
                  backSpeed={80}
                  loop
                  className="text-md md:text-xl text-gray-600 dark:text-gray-300"
                />
              </BoxReveal>
              <BoxReveal boxColor={"#0b1327"} duration={0.5}>
                <div className="icons mt-4 text-gray-600 dark:text-white/60 flex justify-center flex-wrap">
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
              <BoxReveal boxColor={"#0b1327"} duration={0.5}>
                <div className="flex mt-5">
                  <Link href="/contact">
                    <Button name="Get in touch" />
                  </Link>
                  <a
                    href="https://drive.google.com/uc?export=download&id=133oZZsA2HoTxaVnt_4ZwJPPYjTkjopKs"
                    download
                  >
                    <Button name="Download CV" />
                  </a>
                </div>
              </BoxReveal>
            </div>
            <Wave
              fill="#fff4"
              paused={false}
              options={{
                height: 50,
                amplitude: 50,
                speed: 0.15,
                points: 3,
              }}
              className="absolute bottom-0 z-10 "
            />
            <Wave
              fill="#fff5"
              paused={false}
              options={{
                height: 70,
                amplitude: 30,
                speed: 0.2,
                points: 5,
              }}
              className="absolute bottom-0 z-10 "
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
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
        )} opacity-90`}
      />
    </div>
  );
}
