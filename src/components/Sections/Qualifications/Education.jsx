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
      <div className="p-6 flex items-center">
        <div className="w-full">
          <div className="flex items-center">
            <div className="overflow-hidden w-full">
              <div className="flex flex-col md:flex-row justify-between md:items-center w-full">
                <div className="flex items-start md:items-center justify-start gap-2 md:gap-4 w-full">
                  <div className="min-w-16 md:min-w-20">
                    <Zoom>
                      <Image
                        src={edu_logo ? edu_logo : icon}
                        alt="work_ico"
                        className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gray-100 dark:bg-gray-500 p-1 object-cover"
                        width={250}
                        height={250}
                      />
                    </Zoom>
                  </div>
                  <div>
                    <h2 className="text-sm md:text-xl font-bold sm:line-clamp-1">
                      <Fade left>{educationTitle}</Fade>
                    </h2>
                    <div className="text-gray-500 dark:text-gray-400 text-sm uppercase">
                      <Fade left delay={150}>
                        <div className="flex items-start md:items-center flex-col md:flex-row md:gap-2">
                          <span className="inline-flex items-center capitalize gap-1 line-clamp-1 md:line-clamp-none">
                            <i
                              aria-hidden
                              className="bx bxs-briefcase-alt-2"
                            ></i>{" "}
                            {position}
                          </span>
                          <span className="md:inline-flex items-center capitalize gap-1 line-clamp-1 md:line-clamp-none">
                            <i
                              aria-hidden
                              className="fa-solid fa-location-dot text-xs"
                            ></i>{" "}
                            {location}
                          </span>

                          <span className="inline-flex items-center capitalize gap-1 md:hidden text-xs">
                            <div className="mr-1">
                              <i
                                aria-hidden
                                className="fa-regular fa-calendar-days"
                              ></i>
                            </div>
                            <div className="uppercase">
                              {startDate} - {endDate}
                            </div>
                          </span>
                        </div>
                      </Fade>
                    </div>
                  </div>
                </div>

                <div className="text-gray-500 dark:text-gray-400 mt-1 pl-2 text-xs hidden md:block flex-grow text-nowrap">
                  <Fade left={width < 768} right={width > 768} duration={1300}>
                    <div className="flex items-center">
                      <div className="mr-1">
                        <i
                          aria-hidden
                          className="fa-regular fa-calendar-days"
                        ></i>
                      </div>
                      <div className="uppercase">
                        {startDate} - {endDate}
                      </div>
                    </div>
                  </Fade>
                </div>
              </div>
            </div>
          </div>
          <div className="md:ml-20 md:pl-4">
            <Fade up>
              <>
                <p className="mt-3 md:mt-0 text-sm text-gray-500 dark:text-gray-400">
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
