"use client";
import { Fade } from "react-reveal";
import blogList from "../../../utils/blogList.json";
import Title from "../Title";
import BlogCard from "./BlogCard";

export default function Blog() {
  return (
    <>
      <div className="containerCustom gap">
        <Title
          title="blog"
          titleDes="Share my thoughts on Technology and Mobile App Development"
        />
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {blogList.map((blog, idx) => {
            const { img, title, description } = blog || {};
            return (
              <Fade left={idx === 0} up={idx === 1} right={idx === 2} key={idx}>
                <BlogCard img={img} title={title} description={description} />
              </Fade>
            );
          })}
        </div>
      </div>
    </>
  );
}
