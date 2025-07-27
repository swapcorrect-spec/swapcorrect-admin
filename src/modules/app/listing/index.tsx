import { Box, Tabs, Flex } from "@chakra-ui/react";
import { mockListings } from "~/modules/_constants";
import { Header, Tab } from "~/modules/shared";
import List from "./_components/list";
import PageLayout from "~/modules/layout/page-layout";
import type { SwapDetailsProps } from "~/types/base";

export const Listing: React.FC = () => {
  const listingStatus = [
    {
      title: "All",
      value: "all",
    },
    {
      title: "Active",
      value: "active",
    },
    {
      title: "Pending",
      value: "pending",
    },
    {
      title: "Flagged",
      value: "flagged",
    },
    {
      title: "Completed",
      value: "completed",
    },
  ];
  return (
    <PageLayout>
      <Header
        title="Listing Management"
        description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit,euismod tincidunt ut l"
      />
      <Box mt="32px">
        <Tab options={listingStatus} defaultValue="all" />

        <Flex direction="column" gap={6} mt={6}>
          {mockListings.map((list: SwapDetailsProps, idx) => (
            <List key={idx} item={list} />
          ))}
        </Flex>
      </Box>
    </PageLayout>
  );
};
