import ResumeSec from "@/components/Sections/Resume";
import PageLayout from "@/components/PageLayout";

export default function Resume() {
  const title = `Resume - ${process.env.name}`;

  return (
    <>
      <head>
        <title>{title}</title>
      </head>
      <PageLayout>
        <ResumeSec />
      </PageLayout>
    </>
  );
}
