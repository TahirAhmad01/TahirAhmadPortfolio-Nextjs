import "@/assets/css/loading.css";
import TLogoBottom from "@/assets/images/svg/TLogoBottom.svg";
import TLogoTop from "@/assets/images/svg/TLogoTop.svg";
import PageLayout from "@/components/PageLayout";
import Image from "next/image";

function Loading() {
  return (
    <PageLayout>
      <div className="lg:my-48 my-32 flex justify-center">
        <div className="parent">
          <div className="box lg:h-[400px] lg:w-[340px] h-[340px] w-[290px] relative">
            <div className="wave"></div>
            <div className="absolute top-0 left-0 z-[99999999] flex justify-center items-center h-full w-full">
              <div className="md:w-52 w-40 flex justify-center items-center flex-col h-full relative top-10 opacity-100">
                <Image
                  src={TLogoTop}
                  className="w-full h-16 box_shadow z-20"
                  alt="T Logo SVG"
                />
                <Image
                  src={TLogoBottom}
                  className="relative -top-10 h-28 md:h-36 w-12 md:w-16 box_shadow z-10"
                  alt="T Logo SVG"
                />
              </div>
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

export default Loading;
