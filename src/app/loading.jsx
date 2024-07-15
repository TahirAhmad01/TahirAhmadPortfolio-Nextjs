import React from "react";
import "@/assets/css/loading.css";
import PageLayout from "@/components/PageLayout";
import Image from "next/image";
import TLogo from "@/assets/images/TLogo.png"

function loading() {
  return (
    <PageLayout>
      <div className="lg:my-48 my-32 flex justify-center">
        <div className="parent">
          <div className="box lg:h-[400px] lg:w-[340px] h-[340px] w-[290px]">
            <div className="wave" />
            <div className="relative z-[99999999] flex justify-center items-center h-full w-full">
              <Image src={TLogo} className="w-72"/>
            </div>
          </div>
        </div>
      </div>
      <svg
        style={{ visibility: "hidden", position: "absolute" }}
        width={0}
        height={0}
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
      >
        <defs>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation={15}
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 30 -10"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>
    </PageLayout>
  );
}

export default loading;
