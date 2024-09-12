import { ContactMeCard } from "@/components/ContactMeCard";
import PageLayout from "@/components/PageLayout";
import Faq from "@/components/Sections/Faq";
import Skills from "@/components/Sections/Skill";

export const metadata = {
  title: `Skill - ${process.env.name}`,
};

export default function Skill() {
  return (
    <>
      <PageLayout>
        <Skills />
        <Faq />
        <ContactMeCard />
      </PageLayout>
    </>
  );
}
