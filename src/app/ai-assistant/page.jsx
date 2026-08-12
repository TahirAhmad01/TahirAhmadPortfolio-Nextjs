import PageLayout from "@/components/PageLayout";
import AIChatWidget from "@/components/AIChatWidget";
import Title from "@/components/Sections/Title";

export const metadata = {
  title: `AI Assistant - ${process.env.name}`,
};

export default function AIAssistantPage() {
  return (
    <PageLayout>
      <div className="containerCustom gap pt-24 pb-12">
        <Title
          title="AI Portfolio Assistant"
          titleDes="Interact with Tahir's digital assistant to learn about his professional expertise, projects, and qualifications."
        />
        <div className="mt-8 flex justify-center px-4">
          <AIChatWidget isFullPage={true} />
        </div>
      </div>
    </PageLayout>
  );
}
