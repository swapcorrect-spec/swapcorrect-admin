import { Tabs } from "@chakra-ui/react";
interface iTabProps {
  options: {
    value: string;
    title: string;
    children?: React.ReactNode;
  }[];
  defaultValue: string;
}
export const Tab: React.FC<iTabProps> = ({ options, defaultValue }) => {
  return (
    <Tabs.Root variant="enclosed" defaultValue={defaultValue} width="100%">
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
