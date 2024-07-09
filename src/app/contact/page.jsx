import ContactMe from "@/components/Sections/ContactMe";
import PageLayout from "@/components/PageLayout";

export default function Contact() {
  const title = `Contact - ${process.env.name}`;

  return (
    <>
      <head>
        <title>{title}</title>
      </head>

      <PageLayout>
        <ContactMe />
      </PageLayout>
    </>
  );
}
