import ContactMe from '@/components/sections/contactMe';
import PageLayout from '@/components/pageLayout';

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
