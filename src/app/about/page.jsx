import AboutMe from "@/components/sections/about";
import PageLayout from "@/components/pageLayout";

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
