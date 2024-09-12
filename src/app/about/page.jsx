import AboutMe from "@/components/Sections/About";
import PageLayout from "@/components/PageLayout";
import Faq from "@/components/Sections/Faq";

export const metadata = {
  title: `About - ${process.env.name}`,
};

export default function About() {
  return (
    <>
      <PageLayout>
        <AboutMe />
        <Faq />
      </PageLayout>
    </>
  );
}
