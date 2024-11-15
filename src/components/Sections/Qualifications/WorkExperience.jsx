"use client";
import icon from "@/assets/images/webp/work.webp";
import useWindowDimensions from "@/hook/getWindowDimensions";
import Image from "next/image";
import { useState } from "react";
import { Fade, Zoom } from "react-reveal";
import CertificateModal from "./CertificateModal";
import projectList from "@/utils/projectList";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ProjectModal from "../Project/ProjectModal";
import blur from "@/assets/images/webp/blur.webp";

export default function WorkExperience({ work }) {
  const {
    id,
    description,
    endDate,
    startDate,
    workTitle,
    position,
    location,
    certificates,
    company_logo,
  } = work || {};
  const { width } = useWindowDimensions();
  const [isOpen, setOpen] = useState(false);
  const [OpenProject, setOpenProject] = useState(false);
  const [contents, setContent] = useState([]);
  const [projectId, setProjectId] = useState("");

  const handleOpen = () => {
    setOpen(true);
    setContent(certificates);
  };

  const handleOpenProject = (id) => {
    setOpenProject(true);
    setProjectId(id);
  };

  const relatedProjects = projectList.filter(
    ({ worked_company_id }) => id === worked_company_id,
  );

  return (
    <>
      <div className="p-6 flex items-start">
        <div className="w-full">
          <div className="flex items-center">
            <div className="overflow-hidden w-full">
              <div className="flex flex-col md:flex-row justify-between md:items-center w-full">
                <div className="flex items-start md:items-center justify-start gap-2 md:gap-4 w-full">
                  <div className="min-w-16 md:min-w-20">
                    <Zoom>
                      <Image
                        src={company_logo ? company_logo : icon}
                        alt="work_ico"
                        className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gray-100 dark:bg-gray-500 p-1 object-cover"
                        width={250}
                        height={250}
                      />
                    </Zoom>
                  </div>
                  <div>
                    <h2 className="text-sm md:text-xl font-bold sm:line-clamp-1">
                      <Fade left>{workTitle}</Fade>
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
                {certificates &&
                  certificates.map((certificate, idx) => {
                    const { image, title } = certificate || {};
                    const src = image;
                    return (
                      <div
                        key={idx}
                        className="rounded-xl cursor-pointer flex items-center mt-3"
                        onClick={handleOpen}
                      >
                        <Image
                          loader={() => src}
                          src={src}
                          alt={title}
                          className="h-20 md:h-24 w-28 md:w-32 rounded-md overflow-hidden shadow-md"
                          height={300}
                          width={300}
                        />
                        <div className="ml-2 text-gray-500 dark:text-gray-400">
                          {" "}
                          {title}
                        </div>
                      </div>
                    );
                  })}

                {relatedProjects.length > 0 && (
                  <div className="mt-3 text-gray-500 dark:text-gray-400">
                    {relatedProjects.map((project, idx) => {
                      const {
                        id,
                        imageSrc,
                        placeholderSrc,
                        name,
                        description: projectDes,
                        category,
                      } = project || {};
                      return (
                        <div
                          className="flex justify-start items-start gap-2 w-full mb-4 hover:cursor-pointer"
                          key={idx}
                          onClick={() => handleOpenProject(id)}
                        >
                          <div className="object-contain overflow-hidden hover:cursor-pointer h-16 md:h-24 min-w-20 md:min-w-32 rounded-md shadow-md">
                            <LazyLoadImage
                              src={imageSrc}
                              placeholderSrc={
                                placeholderSrc ? placeholderSrc : blur
                              }
                              threshold="100"
                              alt={name}
                              effect="blur"
                              height="100%"
                              width="100%"
                              className="object-cover h-full w-full block"
                              loading="lazy"
                            />
                          </div>

                          <div className="grow">
                            <div className="font-semibold text-sm md:text-lg">{name}</div>
                            <div className="line-clamp-3 md:line-clamp-2 text-xs md:text-sm">
                              {projectDes}
                            </div>

                            {category.map((cat, idx) => (
                              <>
                                <div
                                  className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300 capitalize md:inline-block hidden shadow-md"
                                  key={idx}
                                >
                                  {cat}
                                </div>
                              </>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            </Fade>
          </div>
        </div>
      </div>

      <CertificateModal
        contents={contents}
        open={isOpen}
        setOpen={setOpen}
        handleOpen={handleOpen}
      />

      <ProjectModal
        open={OpenProject}
        handleOpen={handleOpenProject}
        setOpen={setOpenProject}
        projectId={projectId}
      />
    </>
  );
}
