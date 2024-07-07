import PageLayout from "@/components/pageLayout";
import Skills from "@/components/sections/skill";

export default function Skill() {
  const title = `Skill - ${process.env.name}`;

  return (
    <>
      <head>
        <title>{title}</title>
      </head>

      <PageLayout>
        <Skills />
      </PageLayout>
    </>
  );
}
