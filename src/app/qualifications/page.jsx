import QualificationsSec from "@/components/Sections/Qualifications";
import PageLayout from "@/components/PageLayout";
import Faq from "@/components/Sections/Faq";

export const metadata = {
  title: `Qualifications - ${process.env.name}`,
};

export default function Qualifications() {
  return (
    <>
      <PageLayout>
        <QualificationsSec />
        <Faq />
      </PageLayout>
    </>
  );
}
