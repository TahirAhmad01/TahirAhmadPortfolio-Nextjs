import QualificationsSec from "@/components/Sections/Qualifications";
import PageLayout from "@/components/PageLayout";
import Faq from "@/components/Sections/Faq";
import { ContactMeCard } from "@/components/ContactMeCard";

export const metadata = {
  title: "Qualifications & Work Experience | Tahir Ahmad",
  description: "Review Tahir Ahmad's professional experience as Lead Code Reviewer & Software Engineer at Nascenia Ltd (Uddogi platform), Kalpas Innovations, and academic credentials.",
};

export default function Qualifications() {
  return (
    <>
      <PageLayout>
        <QualificationsSec />
        <Faq />
        <ContactMeCard />
      </PageLayout>
    </>
  );
}
