import AboutMe from "@/components/Sections/About";
import PageLayout from "@/components/PageLayout";
import Faq from "@/components/Sections/Faq";
import Contact from "../contact/page";
import { ContactMeCard } from "@/components/ContactMeCard";

export const metadata = {
  title: "About Me | Tahir Ahmad - Software Engineer",
  description: "Learn more about Tahir Ahmad's journey as a Senior Full-Stack Engineer, expertise in Ruby on Rails & Next.js, and engineering philosophy.",
};

export default function About() {
  return (
    <>
      <PageLayout>
        <AboutMe />
        <Faq />
        <ContactMeCard/>
      </PageLayout>
    </>
  );
}
