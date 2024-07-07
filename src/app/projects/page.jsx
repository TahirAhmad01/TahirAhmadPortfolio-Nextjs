import Project from "@/components/sections/project";
import PageLayout from "@/components/pageLayout";

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
