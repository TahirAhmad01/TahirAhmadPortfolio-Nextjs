import Project from "@/components/Sections/Project";
import PageLayout from "@/components/PageLayout";
import Faq from "@/components/Sections/Faq";

export const metadata = {
  title: `Projects - ${process.env.name}`,
};

export default function Projects() {
  return (
    <>
      <PageLayout>
        <Project />
        <Faq />
      </PageLayout>
    </>
  );
}
