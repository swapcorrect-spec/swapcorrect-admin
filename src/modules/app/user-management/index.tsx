import { Box, Flex } from "@chakra-ui/react";
import { TotalSwapper, TotalVisitor } from "~/assets/images";
import PageLayout from "~/modules/layout/page-layout";
import { Header, Select } from "~/modules/shared";
import InfoCard from "~/modules/shared/widgets/info_card";
import UsersTable from "./_components/data-table";
import { useState } from "react";
import { useGetUsers } from "~/hooks/queries/user/user";

export const UserManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const { data: usersData, isLoading } = useGetUsers({
    enabler: true,
    pageNumber: currentPage,
    pageSize: 20,
    filterType: "All",
  });

  console.log("Users Data:", usersData);

  // Transform API data to match table structure
  const tableData = usersData?.items?.map((user) => ({
    profile: user.name,
    trustScore: user.ratingScore,
    swaps: user.swapCompleted,
    status: user.status,
    dateJoined: user.dateJoined,
    role: user.userRole,
  })) || [];

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
        totalPages={usersData?.totalPages || 0}
        loading={isLoading}
      />
    </PageLayout>
  );
};
