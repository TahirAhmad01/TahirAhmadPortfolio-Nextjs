import Project from "@/components/Sections/Project";
import PageLayout from "@/components/PageLayout";
import Faq from "@/components/Sections/Faq";
import { ContactMeCard } from "@/components/ContactMeCard";

export const metadata = {
  title: `Projects - ${process.env.name}`,
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
