import ContactMe from "@/components/Sections/ContactMe";
import PageLayout from "@/components/PageLayout";
import Faq from "@/components/Sections/Faq";
import { ContactMeCard } from "@/components/ContactMeCard";

export const metadata = {
  title: "Contact & Hire Me | Tahir Ahmad",
  description: "Get in touch with Tahir Ahmad for full-stack development, technical leadership, or project consulting. Direct email, WhatsApp, phone (+8801610881871), and social media links.",
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
