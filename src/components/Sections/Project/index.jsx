"use client";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Fade } from "react-reveal";
import projectList from "../../../utils/projectList";
import Title from "../Title";
import Projects from "./Projects";
import { Input } from "@/components/ui/input";
import { FilterProject } from "./FilterProject";

export default function Project() {
  const [items, setItems] = useState([
    ...projectList.sort((b, a) => a.id - b.id),
  ]);
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [selectedCategories, setSelectedCategories] = useState([]); // State for selected categories
  const path = usePathname();

  // Effect to filter projects based on search term and categories
  useEffect(() => {
    let filteredItems = projectList;

    // Filter by search term
    if (searchTerm !== "") {
      filteredItems = filteredItems.filter(
        (project) =>
          project.title &&
          project.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by categories
    if (selectedCategories.length > 0) {
      filteredItems = filteredItems.filter((project) =>
        selectedCategories.every((category) =>
          project.category.includes(category)
        )
      );
    }

    setItems(filteredItems);
  }, [searchTerm, selectedCategories]);

  return (
    <div className="containerCustom gap">
      <Title
        title="projects"
        titleDes="Here are some of the projects I've worked on"
      />

      {path !== "/" && (
        <div className="w-full flex items-end justify-end mb-2 gap-2">
          <Input
            type="text"
            placeholder="Search Project"
            value={searchTerm} // Set value to searchTerm state
            onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm on input change
            className="max-w-[360px] focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <FilterProject
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
        </div>
      )}

      <AnimatePresence>
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 columns-1 gap-1 justify-items-center">
          <Projects items={items} setItem={setItems} />{" "}
        </div>
      </AnimatePresence>

      {path === "/" && (
        <Fade up>
          <div className="text-center mt-9 flex justify-center">
            <Link href="/projects">
              <button
                type="button"
                className=" bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 hover:bg-gradient-to-bl font-medium rounded-3xl text-sm px-5 md:px-9 md:hover:px-16 py-3.5 text-center mr-2 mb-2 text-white transition-all flex items-center justify-center"
              >
                Show more
                <i aria-hidden className="fa-solid fa-arrow-right pl-1"></i>
              </button>
            </Link>
          </div>
        </Fade>
      )}
    </div>
  );
}
