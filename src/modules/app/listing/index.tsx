import { Box, Tabs, Flex } from "@chakra-ui/react";
import { listingStatus, mockListings } from "~/modules/_constants";
import { Header } from "~/modules/shared";
import List from "./_components/list";
import PageLayout from "~/modules/layout/page-layout";

export const Listing: React.FC = () => {
  return (
    <PageLayout>
      <Header
        title="Listing Management"
        description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit,euismod tincidunt ut l"
      />
      <Box mt="32px">
        <Tabs.Root variant="enclosed" display={"flex"} defaultValue={"all"}>
          <Tabs.List width={"100%"}>
            {listingStatus.map((tab, index) => (
              <Tabs.Trigger key={index} value={tab.value} width={"100%"}>
                {tab.title}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
        </Tabs.Root>
        <Flex direction="column" gap={6} mt={6}>
          {mockListings.map((notify, idx) => (
            <List
              key={idx}
              title={notify.title}
              date={notify.date}
              gadget={notify.gadget}
              owner={notify.owner}
              status={notify.status}
            />
          ))}
        </Flex>
      </Box>
    </PageLayout>
  );
};
