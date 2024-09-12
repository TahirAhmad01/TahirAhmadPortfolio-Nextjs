import AboutMe from "@/components/Sections/About";
import PageLayout from "@/components/PageLayout";
import Faq from "@/components/Sections/Faq";
import Contact from "../contact/page";
import { ContactMeCard } from "@/components/ContactMeCard";

export const metadata = {
  title: `About - ${process.env.name}`,
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
