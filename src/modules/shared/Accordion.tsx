import { Box, Accordion as ChakraAccordion, Span } from "@chakra-ui/react";
interface iAccordionProps {
  items: { value: string; title: string; children: React.ReactNode }[];
}

export const Accordion: React.FC<iAccordionProps> = ({ items }) => {
  return (
    <ChakraAccordion.Root collapsible>
      {items.map((item, index) => (
        <ChakraAccordion.Item key={index} value={item.value}>
          <ChakraAccordion.ItemTrigger cursor="pointer">
            <Span flex="1" color="#222222" fontWeight={500} fontSize="14px">
              {item.title}
            </Span>
            <ChakraAccordion.ItemIndicator />
          </ChakraAccordion.ItemTrigger>
          <ChakraAccordion.ItemContent>
            <ChakraAccordion.ItemBody>{item.children}</ChakraAccordion.ItemBody>
          </ChakraAccordion.ItemContent>
        </ChakraAccordion.Item>
      ))}
    </ChakraAccordion.Root>
  );
};
