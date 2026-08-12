"use client";
import icon from "@/assets/images/webp/work.webp";
import useWindowDimensions from "@/hook/getWindowDimensions";
import Image from "next/image";
import { useState } from "react";
import { Fade, Zoom } from "react-reveal";
import CertificateModal from "./CertificateModal";
import projectList from "@/utils/projectList";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ProjectModal from "../Project/ProjectSlide";
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
    ({ worked_company_id }) => id === worked_company_id
  );

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
                        src={company_logo ? company_logo : icon}
                        alt="company_logo"
                        className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gray-100 dark:bg-[#1e293b] p-1.5 object-cover border border-gray-200 dark:border-gray-800 shadow-sm"
                        width={250}
                        height={250}
                      />
                    </Zoom>
                  </div>
                  <div>
                    <h2 className="text-base md:text-xl font-bold text-gray-800 dark:text-gray-100">
                      <Fade left>{workTitle}</Fade>
                    </h2>
                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      <Fade left delay={150}>
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 text-xs font-semibold capitalize">
                          <i aria-hidden className="bx bxs-briefcase-alt-2"></i>
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
          <div className="mt-4 md:ml-20">
            <Fade up>
              <>
                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {description}
                </p>
                {certificates &&
                  certificates.map((certificate, idx) => {
                    const { image, title } = certificate || {};
                    const src = image;
                    return (
                      <div
                        key={idx}
                        className="rounded-2xl cursor-pointer flex items-center mt-4 p-2 bg-gray-50 dark:bg-[#16223b]/50 border border-gray-200/60 dark:border-[#1e2d4a]/60 hover:border-cyan-500/40 transition-all"
                        onClick={handleOpen}
                      >
                        <Image
                          unoptimized
                          src={src}
                          alt={title}
                          className="h-16 md:h-20 w-24 md:w-28 rounded-xl object-cover shadow-sm"
                          height={300}
                          width={300}
                        />
                        <div className="ml-3 font-semibold text-xs md:text-sm text-gray-800 dark:text-gray-200">
                          {title}
                        </div>
                      </div>
                    );
                  })}

                {relatedProjects.length > 0 && (
                  <div className="mt-4 space-y-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-2">
                      Key Production Deliverables:
                    </span>
                    {[...relatedProjects].reverse().map((project, idx) => {
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
                          className="flex justify-start items-center gap-3 p-3.5 rounded-2xl bg-gray-50/90 dark:bg-[#16223b]/50 border border-gray-200/60 dark:border-[#1e2d4a]/60 hover:border-cyan-500/40 hover:shadow-[0_0_15px_rgba(6,182,212,0.08)] transition-all duration-300 cursor-pointer group"
                          key={idx}
                          onClick={() => handleOpenProject(id)}
                        >
                          <div className="h-16 md:h-20 w-24 md:w-28 flex-shrink-0 rounded-xl overflow-hidden shadow-sm">
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
                              className="object-cover h-full w-full block group-hover:scale-105 transition-transform duration-300"
                              loading="lazy"
                            />
                          </div>

                          <div className="grow min-w-0">
                            <div className="font-bold text-sm md:text-base text-gray-800 dark:text-gray-100 group-hover:text-cyan-500 transition-colors">
                              {name}
                            </div>
                            <div className="line-clamp-2 text-xs text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
                              {projectDes}
                            </div>

                            <div className="flex flex-wrap gap-1.5 mt-2">
                              {category.map((cat, catIdx) => (
                                <span
                                  className="bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-cyan-500/20 capitalize"
                                  key={catIdx}
                                >
                                  {cat}
                                </span>
                              ))}
                            </div>
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
