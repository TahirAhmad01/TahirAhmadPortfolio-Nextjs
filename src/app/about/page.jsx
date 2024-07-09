import AboutMe from "@/components/Sections/About";
import PageLayout from "@/components/PageLayout";

export default function About() {
  const title = `About - ${process.env.name}`;

  return (
    <>
      <head>
        <title>{title}</title>
      </head>

      <PageLayout>
        <AboutMe />
      </PageLayout>
    </>
  );
}
