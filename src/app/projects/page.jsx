import Project from "@/components/Sections/Project";
import PageLayout from "@/components/PageLayout";
import Faq from "@/components/Sections/Faq";
import { ContactMeCard } from "@/components/ContactMeCard";

export const metadata = {
  title: "Projects & Production Deliverables | Tahir Ahmad",
  description: "Discover production web applications built by Tahir Ahmad, including Uddogi VAT Management Software, Al-Quran Web App, RTK Query Chat, and AI System Automations.",
};

export default function Projects() {
  return (
    <>
      <PageLayout>
        <Project />
        <Faq />
        <ContactMeCard/>
      </PageLayout>
    </>
  );
}
