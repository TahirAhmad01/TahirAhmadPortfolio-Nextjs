"use client";
import PageLayout from "@/components/PageLayout";
import About from "@/components/Sections/About";
import Blog from "@/components/Sections/Blog";
import ContactMe from "@/components/Sections/ContactMe";
import Home from "@/components/Sections/Home";
import Project from "@/components/Sections/Project";
import Resume from "@/components/Sections/Resume";
import Skill from "@/components/Sections/Skill";
import Testimonial from "@/components/Sections/Testimonial";
import { Suspense } from "react";

export default function Index() {
  // const DynamicFiverrWidget = dynamic(() => import('@/components/Fiverr'), {
  //   ssr: false, // Avoids server-side rendering for this component
  // });
  const title = `${process.env.name} - Portfolio`;

  return (
    <main>
      <head>
        <title>{title}</title>
      </head>

      <Suspense fallback={<p>Loading feed...</p>} delay="2s">
        <Home />
      </Suspense>
      <PageLayout>
        <About />
        <Skill />
        <Project />
        <Resume />
        <Blog />
        {/* <DynamicFiverrWidget /> */}
        <Testimonial />
        <ContactMe />
      </PageLayout>
    </main>
  );
}
