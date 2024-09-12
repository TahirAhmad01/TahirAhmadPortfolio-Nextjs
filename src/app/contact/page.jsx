import ContactMe from "@/components/Sections/ContactMe";
import PageLayout from "@/components/PageLayout";
import Faq from "@/components/Sections/Faq";
import { ContactMeCard } from "@/components/ContactMeCard";

export const metadata = {
  title: `Contact - ${process.env.name}`,
};

export default function Contact() {
  return (
    <>
      <PageLayout>
        <ContactMe />
      </PageLayout>
    </>
  );
}
