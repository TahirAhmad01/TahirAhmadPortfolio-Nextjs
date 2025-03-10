import { ContactMeCard } from "@/components/ContactMeCard";
import PageLayout from "@/components/PageLayout";
import About from "@/components/Sections/About";
import Blog from "@/components/Sections/Blog";
import Faq from "@/components/Sections/Faq";
import Home from "@/components/Sections/Home";
import Project from "@/components/Sections/Project";
import Resume from "@/components/Sections/Qualifications";
import Skill from "@/components/Sections/Skill";
import Testimonial from "@/components/Sections/Testimonial";

function loadStylesAndScripts() {
  return new Promise((resolve) => {
    const stylesPromise = new Promise((styleResolve) =>
      setTimeout(styleResolve, 1000)
    );

    Promise.all([stylesPromise]).then(() => {
      resolve();
    });

    return () => clearTimeout(timer);
  });
}

export const metadata = {
  title: `Home - ${process.env.name}`,
};

export default async function Index() {
  await loadStylesAndScripts();

  return (
    <main>
      <Home />
      <PageLayout>
        <About />
        <Skill />
        <Project />
        <Resume />
        <Blog />
        <Testimonial />
        <Faq />
        {/* <ContactMe /> */}
        <ContactMeCard />
      </PageLayout>
    </main>
  );
}

export const dynamic = "force-dynamic";
