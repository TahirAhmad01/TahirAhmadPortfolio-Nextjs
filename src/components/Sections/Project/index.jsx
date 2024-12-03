"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Fade } from "react-reveal";
import projectList from "../../../utils/projectList";
import Title from "../Title";
import Projects from "./Projects";
import { Input, InputWithDebounce } from "@/components/ui/input";
import { FilterProject } from "./FilterProject";
import { Button } from "@/components/ui/button";
import { IoGrid } from "react-icons/io5";
import { FaThList } from "react-icons/fa";
import { Skeleton } from "@/components/ui/skeleton";
import { MdSearchOff } from "react-icons/md";

export default function Project() {
  const [items, setItems] = useState([]);
  const [initialItems, setInitialItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [isGridView, setIsGridView] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filtering, setFiltering] = useState(false);
  const path = usePathname();

  useEffect(() => {
    const savedView = localStorage.getItem("viewMode");
    setIsGridView(savedView ? savedView === "grid" : true);
  }, []);

  useEffect(() => {
    const sortedList = [...projectList].sort((b, a) => a.id - b.id);

    if (path === "/" && sortedList.length > 9) {
      setInitialItems(sortedList.slice(0, 9));
    } else {
      setInitialItems(sortedList);
    }
  }, [path]);

  useEffect(() => {
    setFiltering(true);
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
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, [searchTerm, selectedCategories, selectedTypes, initialItems]);

  const toggleView = () => {
    const newView = !isGridView ? "grid" : "list";
    setIsGridView(!isGridView);
    localStorage.setItem("viewMode", newView);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      const isMac = navigator.platform.includes("Mac");
      const isCtrlOrMetaPressed = isMac ? e.metaKey : e.ctrlKey;

      if (isCtrlOrMetaPressed && e.key === "k") {
        e.preventDefault();
        const searchInput = document.querySelector("input[type='text']");
        if (searchInput) {
          searchInput.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleSearch = (debouncedSearchTerm) => {
    setSearchTerm(debouncedSearchTerm);
  };

  return (
    <div className="containerCustom gap">
      <Title
        title="projects"
        titleDes="Here are some of the projects I've worked on"
      />

      {path !== "/" && (
        <div className="w-full flex items-end justify-end mb-2 gap-2">
          <InputWithDebounce
            onDebounce={handleSearch}
            placeholder="Search for items..."
          />
          <FilterProject
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            selectedTypes={selectedTypes}
            setSelectedTypes={setSelectedTypes}
          />
          <Button variant="outline" onClick={toggleView}>
            <div className={`${isGridView === null && "opacity-0"}`}>
              {isGridView ? <FaThList /> : <IoGrid />}
            </div>
          </Button>
        </div>
      )}

      {loading && isGridView != null ? (
        <div
          className={`grid gap-1 justify-items-center ${
            isGridView ? "lg:grid-cols-3 sm:grid-cols-2" : "grid-cols-1"
          }`}
        >
          {Array(9)
            .fill(0)
            .map((_, idx) =>
              isGridView ? (
                <Skeleton
                  className="w-full h-64 sm:h-52 lg:h-56 rounded-md"
                  key={idx}
                />
              ) : (
                <div
                  className="flex items-center w-full space-x-4 p-2 rounded-md"
                  key={idx}
                >
                  <Skeleton className="md:w-60 w-32 h-24 md:h-32 rounded-md" />
                  <div className="flex flex-col flex-1 space-y-2">
                    <Skeleton className="h-5 w-3/4 rounded-md" />
                    <Skeleton className="h-4 w-1/2 rounded-md" />
                    <Skeleton className="h-4 w-1/3 rounded-md" />
                  </div>
                </div>
              )
            )}
        </div>
      ) : (
        <>
          {!loading && items.length === 0 && (
            <div className="flex flex-col items-center text-center py-10 slide-in-from-top-11">
              <MdSearchOff className="text-gray-500 text-6xl mb-2" />
              <p className="text-gray-500">No Project Found</p>
            </div>
          )}
          <div
            className={`${
              path === "/" || isGridView
                ? "grid lg:grid-cols-3 sm:grid-cols-2 gap-1 justify-items-center"
                : "flex flex-col gap-3 w-full"
            } relative`}
          >
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layoutId={`project-${item.id}`}
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  transition={{
                    duration: 0.5,
                  }}
                  className="w-full"
                >
                  <Projects item={item} isGridView={isGridView} path={path} />
                </motion.div>
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
