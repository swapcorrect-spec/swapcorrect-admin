import { Box, Flex } from "@chakra-ui/react";
import { TotalSwapper, TotalVisitor } from "~/assets/images";
import PageLayout from "~/modules/layout/page-layout";
import { Header, Select } from "~/modules/shared";
import InfoCard from "~/modules/shared/widgets/info_card";
import UsersTable from "./_components/data-table";
import { useState } from "react";

export const UserManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const INFOLIST = [
    {
      title: "Total Swapper",
      value: 1234,
      icon: <TotalSwapper />,
      progress: true,
    },
    {
      title: "Total Visitor",
      value: 300,
      icon: <TotalVisitor />,
      progress: true,
    },
  ];

  const tableData = [
    {
      profile: "John Doe",
      trustScore: 82,
      swaps: 15,
      status: "Active",
      dateJoined: "2024-06-10",
      role: "Merchant",
    },
    {
      profile: "Jane Smith",
      trustScore: 95,
      swaps: 42,
      status: "Pending",
      dateJoined: "2024-07-01",
      role: "Admin",
    },
    {
      profile: "Michael Johnson",
      trustScore: 67,
      swaps: 8,
      status: "Flagged",
      dateJoined: "2024-05-18",
      role: "User",
    },
    {
      profile: "Sophia Lee",
      trustScore: 73,
      swaps: 22,
      status: "Suspended",
      dateJoined: "2024-08-25",
      role: "Merchant",
    },
    {
      profile: "Daniel Brown",
      trustScore: 90,
      swaps: 35,
      status: "Active",
      dateJoined: "2024-09-15",
      role: "Super Admin",
    },
  ];

  return (
    <PageLayout>
      <Flex justifyContent="space-between" alignItems="center">
        <Header
          title="User Overview"
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
      <UsersTable
        data={tableData}
        currentPage={currentPage}
        onPageChange={onPageChange}
        totalPages={30}
        loading={false}
      />
    </PageLayout>
  );
};
