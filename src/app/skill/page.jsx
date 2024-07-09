import PageLayout from "@/components/PageLayout";
import Skills from "@/components/Sections/Skill";

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
