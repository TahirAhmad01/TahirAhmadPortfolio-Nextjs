import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import FaqImg from "@/assets/images/faq.png";
import faqList from "@/utils/faqList.json";
import Title from "../Title";

export default function Faq() {

  return (
    <div className="containerCustom gap">
      <Title title="FAQ" titleDes="Frequently asked questions" />
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 items-center">
        <div className="lg:col-span-3">
          <Accordion type="single" collapsible className="w-full">
            {faqList.map((faq, idx) => (
              <AccordionItem
                className="border-gray-300 dark:border-gray-700"
                value={faq.id}
                key={idx}
              >
                <AccordionTrigger className="text-left text-sm md:text-lg font-semibold hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        <div className="lg:col-span-2 hidden md:block">
          <Image
            src={FaqImg}
            alt="Qubartech Faq image"
            height="0"
            width="0"
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}
