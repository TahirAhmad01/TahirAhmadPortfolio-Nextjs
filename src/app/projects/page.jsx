import Project from "@/components/Sections/Project";
import PageLayout from "@/components/PageLayout";

export default function Projects() {
  const title = `Projects - ${process.env.name}`;

  return (
    <>
      <head>
        <title>{title}</title>
      </head>

      <PageLayout>
        <Project />
      </PageLayout>
    </>
  );
}
