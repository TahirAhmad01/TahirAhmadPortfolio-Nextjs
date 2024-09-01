import QualificationsSec from "@/components/Sections/Qualifications";
import PageLayout from "@/components/PageLayout";

export const metadata = {
  title: `Qualifications - ${process.env.name}`,
};

export default function Qualifications() {
  return (
    <>
      <PageLayout>
        <QualificationsSec />
      </PageLayout>
    </>
  );
}
