import icon from "@/assets/images/png/university.png";
import useWindowDimensions from "@/hook/getWindowDimensions";
import Image from "next/image";
import { Fade, Zoom } from "react-reveal";

export default function Education({ education }) {
  const {
    description,
    endDate,
    startDate,
    educationTitle,
    edu_logo,
    position,
    location,
  } = education || {};
  const { width } = useWindowDimensions();

  return (
    <>
      <div className="py-6 flex items-start">
        <div className="w-full">
          <div className="flex items-center">
            <div className="overflow-hidden w-full">
              <div className="flex flex-col md:flex-row justify-between md:items-center w-full gap-4">
                <div className="flex items-center justify-start gap-3 md:gap-4 w-full">
                  <div className="flex-shrink-0">
                    <Zoom>
                      <Image
                        src={edu_logo ? edu_logo : icon}
                        alt="edu_logo"
                        className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gray-100 dark:bg-[#1e293b] p-1.5 object-cover border border-gray-200 dark:border-gray-800 shadow-sm"
                        width={250}
                        height={250}
                      />
                    </Zoom>
                  </div>
                  <div>
                    <h2 className="text-base md:text-xl font-bold text-gray-800 dark:text-gray-100">
                      <Fade left>{educationTitle}</Fade>
                    </h2>
                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      <Fade left delay={150}>
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 text-xs font-semibold capitalize">
                          <i aria-hidden className="fa-solid fa-graduation-cap text-xs"></i>
                          {position}
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 capitalize">
                          <i aria-hidden className="fa-solid fa-location-dot text-xs text-rose-500"></i>
                          {location}
                        </span>
                      </Fade>
                    </div>
                  </div>
                </div>

                <div className="flex-shrink-0">
                  <Fade left={width < 768} right={width > 768} duration={1300}>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-[#1e293b]/90 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800 text-xs font-bold">
                      <i aria-hidden className="fa-regular fa-calendar-days text-cyan-500"></i>
                      <span className="uppercase">{startDate} - {endDate}</span>
                    </div>
                  </Fade>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-3 md:ml-20">
            <Fade up>
              <>
                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {description}
                </p>
              </>
            </Fade>
          </div>
        </div>
      </div>
    </>
  );
}
