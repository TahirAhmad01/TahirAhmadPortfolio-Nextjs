
import { motion } from "framer-motion";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { PhotoProvider, PhotoView } from "react-photo-view";
import ProjectList from "@/utils/projectList.json";
import PageLayout from "@/components/PageLayout";


export default function Projects({ projectId }) {
  const findProject = ProjectList.find((project) => project?.id === projectId);

  if (!findProject) return <div>No project found!</div>;

  const {
    name,
    imageSrc = [],
    category = [],
    link,
    source,
    description,
  } = findProject;

  return (
    <PageLayout>
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="containerCustom gap py-5"
      >
        {/* Project Header */}
        <div className="py-5 px-5">
          <h2 className="text-2xl font-medium capitalize dark:text-white">
            {name}
          </h2>
          <p className="text-sm text-gray-700 dark:text-gray-400 mt-2 mb-4">
            {description || "No description available for this project."}
          </p>
        </div>

        {/* Image Section */}
        <div className="min-h-[30vh] max-h-[50vh] overflow-hidden rounded-lg relative select-none">
          <PhotoProvider>
            {imageSrc.length > 1 ? (
              <Swiper
                navigation
                modules={[Navigation, Pagination, Autoplay]}
                className="mySwiper w-full h-full"
                pagination={{ type: "progressbar" }}
                lazy={true}
                loop
              >
                {imageSrc.map((img, idx) => (
                  <SwiperSlide
                    key={idx}
                    className="!h-full relative min-h-[5vh] max-h-[52vh]"
                  >
                    <PhotoView src={img}>
                      <Image
                        loader={() => img}
                        loading="lazy"
                        src={img}
                        alt={name}
                        width={0}
                        height={0}
                        sizes="(max-width: 768px) 13vw, (max-width: 1200px) 9vw, 5vw"
                        className="!w-full !h-full object-cover"
                        placeholder="blur"
                        blurDataURL={img}
                      />
                    </PhotoView>
                    <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              imageSrc[0] && (
                <PhotoView src={imageSrc[0]}>
                  <Image
                    loader={() => imageSrc[0]}
                    loading="lazy"
                    src={imageSrc[0]}
                    alt={name}
                    width={0}
                    height={0}
                    className="w-full h-full object-cover"
                    placeholder="blur"
                    blurDataURL={imageSrc[0]}
                  />
                </PhotoView>
              )
            )}
          </PhotoProvider>
        </div>

        {/* Categories */}
        <div className="py-5 px-5">
          {category.length > 0 && (
            <div className="mb-5">
              {category.map((cat, idx) => (
                <div
                  key={idx}
                  className="bg-blue-100 text-blue-800 text-xs font-medium mr-1 px-2.5 py-0.5 rounded-2xl dark:bg-blue-200 dark:text-blue-800 capitalize inline-block"
                >
                  {cat}
                </div>
              ))}
            </div>
          )}

          {/* Links */}
          {(link || source) && (
            <div className="mt-3 flex gap-1">
              {link && (
                <a href={link} target="_blank" rel="noreferrer">
                  <button className="bg-[#7c3aed] hover:bg-[#5b21b6] text-sm text-white font-medium py-2 px-3 rounded-lg inline-flex items-center">
                    <i
                      aria-hidden
                      className="fa-solid fa-share-from-square mr-2"
                    ></i>
                    <span>Live Preview</span>
                  </button>
                </a>
              )}
              {source && (
                <a href={source} target="_blank" rel="noreferrer">
                  <button className="bg-[#475569] hover:bg-[#334155] text-sm text-white font-medium py-2 px-3 rounded-lg inline-flex items-center">
                    <i aria-hidden className="fa-brands fa-github mr-2"></i>
                    <span>Github</span>
                  </button>
                </a>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </PageLayout>
  );
}
