import ResumeSec from "@/components/Sections/Resume";
import PageLayout from "@/components/PageLayout";

export const metadata = {
  title: `Resume - ${process.env.name}`,
};

export default function Resume() {
  return (
    <>
      <PageLayout>
        <ResumeSec />
      </PageLayout>
    </>
  );
}
