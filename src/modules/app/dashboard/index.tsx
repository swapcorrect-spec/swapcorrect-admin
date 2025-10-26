import {
  ActiveSwaps,
  CompletedSwaps,
  NewSignUps,
  RecentActivity,
  TotalUsers,
} from "~/assets/images";
import PageLayout from "~/modules/layout/page-layout";
import { Header, Select } from "~/modules/shared";
import { Box, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router";
import InfoCard from "~/modules/shared/widgets/info_card";
import { ChevronRight } from "lucide-react";
import { PATHS } from "~/modules/_constants/paths";

export const Dashboard = () => {
  const INFOLIST = [
    {
      title: "Total Users",
      value: 1234,
      icon: <TotalUsers />,
      progress: true,
    },
    {
      title: "Completed Swaps",
      value: 1500,
      icon: <CompletedSwaps />,
      progress: true,
    },
    {
      title: "Active Swaps",
      value: 200,
      icon: <ActiveSwaps />,
      progress: false,
    },
    {
      title: "New Sign Ups",
      value: 5000,
      icon: <NewSignUps />,
      progress: false,
    },
  ];

  return (
    <>
      <PageLayout>
        <Flex justifyContent="space-between" alignItems="center">
          <Header
            title="Welcome, Kathleen"
            description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit,euismod tincidunt ut l"
          />
          <Box>
            <Select
              name="date"
              placeholder="Choose a date"
              options={[
                { value: "today", label: "Today" },
                { value: "this_week", label: "This Week" },
                { value: "this_month", label: "This Month" },
                { value: "all_time", label: "All Time" },
              ]}
              // value={selectedCountry}
              onChange={(val) => console.log(val)}
            />
          </Box>
        </Flex>
        <Flex gap="16px" my="32px">
          {INFOLIST.map((info, idx) => (
            <InfoCard
              key={idx}
              icon={info.icon}
              title={info.title}
              count={info.value}
              progress={info.progress}
            />
          ))}
        </Flex>
        <Box borderRadius="12px" width="100%" border="1px solid #EAEAEA">
          <Box
            borderBottom="1px solid #EAEAEA"
            py="20px"
            px="16px"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text fontSize="20px" color="#222222" fontWeight={500}>
              Recent Activity
            </Text>
            <Link to={PATHS.SWAPACTIVITY}>
              <Text
                fontSize="13px"
                color="#007AFF"
                display="flex"
                alignItems="center"
                gap={1}
              >
                View all
                <ChevronRight size={14} color="#007AFF" />
              </Text>
            </Link>
          </Box>
          <Flex flexDirection="column" px="16px">
            {Array.from({ length: 8 }).map((_, index) => (
              <Box
                key={index}
                display="flex"
                alignItems="center"
                gap="12px"
                borderBottom={index !== 7 ? "1px solid #E9E9E9" : "none"} // no border for last
                py="12px"
              >
                <RecentActivity />
                <Text
                  fontSize="16px"
                  color="#222222"
                  fontWeight={500}
                  mr="auto"
                >
                  New swap listing approved
                </Text>
                <Text fontSize="12px" color="#737373" fontWeight={500}>
                  2 hours ago
                </Text>
              </Box>
            ))}
          </Flex>
        </Box>
      </PageLayout>
    </>
  );
};
