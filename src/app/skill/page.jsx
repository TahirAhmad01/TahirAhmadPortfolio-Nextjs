import { ContactMeCard } from "@/components/ContactMeCard";
import PageLayout from "@/components/PageLayout";
import Faq from "@/components/Sections/Faq";
import Skills from "@/components/Sections/Skill";

export const metadata = {
  title: "Technical Skills & Architecture | Tahir Ahmad",
  description: "Explore Tahir Ahmad's engineering skill set spanning Next.js 14, React 18, Ruby on Rails, Node.js, AI Tools (Gemini, Claude), and Cloud Infrastructure.",
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
