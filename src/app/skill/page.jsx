import PageLayout from "@/components/PageLayout";
import Skills from "@/components/Sections/Skill";

export const metadata = {
  title: `Skill - ${process.env.name}`,
};

export default function Skill() {
  return (
    <>
      <PageLayout>
        <Skills />
      </PageLayout>
    </>
  );
}
