"use client";
import Icon from "@/assets/images/work.webp";
import useWindowDimensions from "@/hook/getWindowDimensions";
import Image from "next/image";
import { useState } from "react";
import { Fade, Zoom } from "react-reveal";
import CertificateModal from "./CertificateModal";
import projectList from "@/utils/projectList";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ProjectModal from "../Project/ProjectModal";
import blur from "@/assets/images/blur.webp";

export default function WorkExperience({ work }) {
  const {
    description,
    endDate,
    startDate,
    workTitle,
    position,
    location,
    certificates,
    project_list,
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

  const relatedProjects = Array.isArray(project_list)
    ? projectList.filter((project) => project_list.includes(project.id))
    : [];

  return (
    <>
      <div className="p-6 flex items-start">
        <div className="w-full">
          <div className="flex items-center">
            <div className="overflow-hidden w-full">
              <div className="flex flex-col md:flex-row justify-between md:items-center">
                <div className="flex items-center justify-start gap-2 md:gap-4">
                  <div>
                    <Zoom>
                      <Image
                        src={Icon}
                        alt="work_ico"
                        className="w-20 h-20 rounded-full bg-gray-200 object-cover"
                        width={0}
                        height={0}
                      />
                    </Zoom>
                  </div>
                  <div>
                    <h2 className="font-medium text-lg md:text-xl md:font-bold">
                      <Fade left>{workTitle}</Fade>
                    </h2>
                    <div className="text-gray-500 dark:text-gray-200 text-sm uppercase">
                      <Fade left delay={150}>
                        <div className="flex items-start md:items-center flex-col md:flex-row md:gap-2">
                          <span className="inline-flex items-center capitalize gap-1">
                            <i
                              aria-hidden
                              className="bx bxs-briefcase-alt-2"
                            ></i>{" "}
                            {position}
                          </span>
                          <span className="inline-flex items-center capitalize gap-1">
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
                            <div className="uppercase">{startDate}</div>
                            <div className="mx-1"> - </div>
                            <div className="uppercase">{endDate}</div>
                          </span>
                        </div>
                      </Fade>
                    </div>
                  </div>
                </div>

                <div className="text-gray-500 dark:text-gray-200 mt-1 ml-20 pl-2 text-xs hidden md:block">
                  <Fade
                    left={width < 768}
                    right={width > 768}
                    duration={1300}
                  >
                    <div className="flex items-center">
                      <div className="mr-1">
                        <i
                          aria-hidden
                          className="fa-regular fa-calendar-days"
                        ></i>
                      </div>
                      <div className="uppercase">{startDate}</div>
                      <div className="mx-1"> - </div>
                      <div className="uppercase">{endDate}</div>
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
                          className="h-20 md:h-24 w-28 md:w-32 rounded-md overflow-hidden"
                          height={300}
                          width={300}
                        />
                        <div className="ml-2 text-gray-400"> {title}</div>
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
                          <div className="object-contain overflow-hidden hover:cursor-pointer h-20 md:h-24 w-28 md:w-32 rounded-md">
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
                              className="object-cover min-h-full w-full block"
                              loading="lazy"
                            />
                          </div>

                          <div className="w-[calc(100%-9rem)]">
                            <div className="font-semibold text-lg">{name}</div>
                            <div className="line-clamp-2 text-xs md:text-sm">
                              {projectDes}
                            </div>

                            {category.map((cat, idx) => (
                              <>
                                <div
                                  className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300 capitalize inline-block"
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
