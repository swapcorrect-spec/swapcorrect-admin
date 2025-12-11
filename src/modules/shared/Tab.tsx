import { Tabs } from "@chakra-ui/react";
interface iTabProps {
  options: {
    value: string;
    title: string;
    children?: React.ReactNode;
  }[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}
export const Tab: React.FC<iTabProps> = ({ options, defaultValue, value, onValueChange }) => {
  return (
    <Tabs.Root
      variant="enclosed"
      {...(value !== undefined ? { value } : { defaultValue })}
      onValueChange={(e) => onValueChange?.(e.value)}
      width="100%"
    >
      <Tabs.List width={"100%"}>
        {options.map((tab, index) => (
          <Tabs.Trigger key={index} value={tab.value} width={"100%"}>
            {tab.title}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {options.map((_, idx) => (
        <Tabs.Content value={_.value} key={idx}>
          {_.children}
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
};
