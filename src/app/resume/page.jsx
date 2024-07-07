import ResumeSec from "@/components/sections/resume";
import PageLayout from "@/components/pageLayout";

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
