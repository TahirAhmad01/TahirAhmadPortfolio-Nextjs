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
import Loading from './loading';

export const metadata = {
  title: `Home - ${process.env.name}`,
};

export default async function Index() {
  await new Promise((resolve) => setTimeout(resolve, 300000));

  return (
    // <Suspense fallback={<Loading />}>
      <main>
        <Home />
        <PageLayout>
          <About />
          <Skill />
          <Project />
          <Resume />
          <Blog />
          <Testimonial />
          <ContactMe />
        </PageLayout>
      
    </main>
    // </Suspense>
  );
}

export const dynamic = "force-dynamic";
