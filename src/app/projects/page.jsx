import Project from "@/components/Sections/Project";
import PageLayout from "@/components/PageLayout";

export const metadata = {
  title: `Projects - ${process.env.name}`,
};


export default function Projects() {
  return (
    <>
      <PageLayout>
        <Project />
      </PageLayout>
    </>
  );
}
