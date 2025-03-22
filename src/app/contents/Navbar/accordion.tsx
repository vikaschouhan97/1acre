import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AccordionData } from "@/utils/types";

type AccordionComponentProps = {
    data: AccordionData;
  };

const AccordionComponent: React.FC<AccordionComponentProps> = ({ data }) => {
  return (
    <Accordion type="single" collapsible className="p-0">
      <AccordionItem value="item-1">
        <AccordionTrigger className="flex items-center space-x-2 hover:no-underline cursor-pointer pt-0">
          <span className="flex gap-2 justify-center text-lg">
            {data.icon}
            {data.title}
          </span>
        </AccordionTrigger>
        {data?.options.map((item: string) => {
          return (
            <AccordionContent key={item} className="cursor-pointer text-lg">
              {item}
            </AccordionContent>
          );
        })}
      </AccordionItem>
    </Accordion>
  );
};

export default AccordionComponent;
