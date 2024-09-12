"use client";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { DebounceInput } from "react-debounce-input";
import { Fade } from "react-reveal";
import projectList from "../../../utils/projectList";
import Title from "../Title";
import Projects from "./Projects";
import { Input } from "@/components/ui/input";
import { FilterProject } from "./FilterProject";
import { Button } from "@/components/ui/button";
import { IoGrid } from "react-icons/io5";
import { FaThList } from "react-icons/fa";
import Loading from "@/app/loading";
import { Skeleton } from "@/components/ui/skeleton";

export default function Project() {
  const [items, setItems] = useState([]);
  const [initialItems, setInitialItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [isGridView, setIsGridView] = useState(true);
  const [loading, setLoading] = useState(true); // Add loading state
  const path = usePathname();

  useEffect(() => {
    const sortedList = [...projectList].sort((b, a) => a.id - b.id);

    if (path === "/" && sortedList.length > 9) {
      setInitialItems(sortedList.slice(0, 9));
    } else {
      setInitialItems(sortedList);
    }
    setLoading(false); // Once items are set, stop loading
  }, [path]);

  useEffect(() => {
    let filteredItems = initialItems;

    if (searchTerm !== "") {
      filteredItems = filteredItems.filter(
        (project) =>
          project.name &&
          project.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategories.length > 0) {
      filteredItems = filteredItems.filter((project) =>
        selectedCategories.every((category) =>
          project.category.includes(category)
        )
      );
    }

    if (selectedTypes.includes("associated")) {
      filteredItems = filteredItems.filter(
        (project) => project.worked_company_id
      );
    }

    if (selectedTypes.includes("personal")) {
      filteredItems = filteredItems.filter(
        (project) => !project.worked_company_id
      );
    }

    setItems(filteredItems);
  }, [searchTerm, selectedCategories, selectedTypes, initialItems]);

  const toggleView = () => {
    setIsGridView((prev) => !prev);
  };

  return (
    <div className="containerCustom gap">
      <Title
        title="projects"
        titleDes="Here are some of the projects I've worked on"
      />

      {path !== "/" && (
        <div className="w-full flex items-end justify-end mb-2 gap-2">
          <DebounceInput
            minLength={1}
            debounceTimeout={300}
            element={Input}
            type="text"
            placeholder="Search Project"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-[360px] focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <FilterProject
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            selectedTypes={selectedTypes}
            setSelectedTypes={setSelectedTypes}
          />
          <Button variant="outline" onClick={toggleView}>
            {isGridView ? <FaThList /> : <IoGrid />}
          </Button>
        </div>
      )}

      {loading ? (
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-1 justify-items-center">
          <Skeleton className="w-full h-64 sm:h-52 lg:h-56" />
          <Skeleton className="w-full h-64 sm:h-52 lg:h-56" />
          <Skeleton className="w-full h-64 sm:h-52 lg:h-56" />
          <Skeleton className="w-full h-64 sm:h-52 lg:h-56" />
          <Skeleton className="w-full h-64 sm:h-52 lg:h-56" />
          <Skeleton className="w-full h-64 sm:h-52 lg:h-56" />
          <Skeleton className="w-full h-64 sm:h-52 lg:h-56" />
          <Skeleton className="w-full h-64 sm:h-52 lg:h-56" />
        </div>
      ) : (
        <>
          <div
            className={`${
              isGridView
                ? "grid lg:grid-cols-3 sm:grid-cols-2 gap-1 justify-items-center"
                : "flex flex-col gap-3"
            }`}
          >
            <AnimatePresence>
              {items.map((item, idx) => (
                <Projects item={item} isGridView={isGridView} key={idx} />
              ))}
            </AnimatePresence>
          </div>

          {path === "/" && (
            <Fade up>
              <div className="text-center mt-9 flex justify-center">
                <Link href="/projects">
                  <button
                    type="button"
                    className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 hover:bg-gradient-to-bl font-medium rounded-3xl text-sm px-5 md:px-9 md:hover:px-16 py-3.5 text-center mr-2 mb-2 text-white transition-all flex items-center justify-center"
                  >
                    Show more
                    <i aria-hidden className="fa-solid fa-arrow-right pl-1"></i>
                  </button>
                </Link>
              </div>
            </Fade>
          )}
        </>
      )}
    </div>
  );
}
