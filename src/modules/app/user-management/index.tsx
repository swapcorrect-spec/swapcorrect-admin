import { Grid, Skeleton } from "@chakra-ui/react";
import {
  Approve,
  Caution,
  TotalSwapper,
  TotalUsers,
  TotalVisitor,
} from "~/assets/images";
import PageLayout from "~/modules/layout/page-layout";
import { Header, Input, QueryState, Select } from "~/modules/shared";
import InfoCard from "~/modules/shared/widgets/info_card";
import UsersTable from "./_components/data-table";
import { useMemo, useState } from "react";
import { useGetUserStats, useGetUsers } from "~/hooks/queries/user/user";
import {
  USER_FILTER_TYPE_OPTIONS,
  type UserFilterType,
} from "~/hooks/queries/user/user.type";
import { useDebouncedValue } from "~/hooks/useDebouncedValue";

export const UserManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [filterType, setFilterType] = useState<UserFilterType>("All");

  const debouncedSearch = useDebouncedValue(searchInput, 400);

  const resetPage = () => setCurrentPage(1);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const { data: usersData, isLoading, isFetching, isError, error, refetch } =
    useGetUsers({
    enabler: true,
    pageNumber: currentPage,
    pageSize: 20,
    search: debouncedSearch,
    filterType,
  });

  const {
    data: userStatsData,
    isLoading: isStatsLoading,
    isFetching: isStatsFetching,
  } = useGetUserStats({ enabler: true });

  const tableData = usersData?.items?.map((user) => ({
    id: user.userId,
    profile: user.name,
    email: user.email || "",
    isSuspended: user.isSuspended ?? false,
    trustScore: user.ratingScore,
    swaps: user.swapCompleted,
    status: user.status,
    dateJoined: user.dateJoined,
    role: user.userRole,
    profilePicture: user.profilePicture || "",
  })) || [];

  const INFOLIST = useMemo(
    () => [
      {
        title: "Total Users",
        value: userStatsData?.totalUsers ?? 0,
        icon: <TotalUsers />,
      },
      {
        title: "Active Users",
        value: userStatsData?.activeUsers ?? 0,
        icon: <Approve />,
      },
      {
        title: "Inactive Users",
        value: userStatsData?.inactiveUsers ?? 0,
        icon: <Caution />,
      },
      {
        title: "Total Swapper",
        value: userStatsData?.totalSwappers ?? 0,
        icon: <TotalSwapper />,
      },
      {
        title: "Total Visitor",
        value: userStatsData?.totalVisitors ?? 0,
        icon: <TotalVisitor />,
      },
    ],
    [userStatsData]
  );

  return (
    <PageLayout>
      <Header
        title="User Overview"
        description="Manage your users and track their activity"
      />
      <Grid
        templateColumns={{
          base: "1fr",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
          xl: "repeat(5, 1fr)",
        }}
        gap="16px"
        my="32px"
      >
        {isStatsLoading || isStatsFetching
          ? Array.from({ length: 5 }).map((_, idx) => (
              <Skeleton
                key={idx}
                height="120px"
                borderRadius="12px"
                border="1px solid #EAEAEA"
              />
            ))
          : INFOLIST.map((info, idx) => (
              <InfoCard
                key={idx}
                icon={info.icon}
                title={info.title}
                count={info.value}
                showFooter={false}
              />
            ))}
      </Grid>
      <Grid
        templateColumns={{
          base: "1fr",
          md: "1fr 280px",
        }}
        gap={4}
        mb="24px"
        alignItems="end"
      >
        <Input
          type="search"
          name="user-search"
          label="Search"
          placeholder="Search by name, email, or keyword..."
          value={searchInput}
          handleChange={(e) => {
            setSearchInput(e.target.value);
            resetPage();
          }}
        />
        <Select
          name="filter-type"
          placeholder="Filter by status"
          options={USER_FILTER_TYPE_OPTIONS}
          value={filterType}
          onChange={(val) => {
            setFilterType(val as UserFilterType);
            resetPage();
          }}
        />
      </Grid>
      <QueryState
        isLoading={isLoading || isFetching}
        isError={isError}
        error={error}
        onRetry={() => refetch()}
        isEmpty={tableData.length === 0}
        emptyProps={{
          title: "No users found",
          description:
            "There are no users matching your filters. Try a different filter or search.",
        }}
        errorProps={{
          title: "Could not load users",
          description: "We had trouble fetching users. Please try again.",
        }}
      >
        <UsersTable
          data={tableData}
          currentPage={currentPage}
          onPageChange={onPageChange}
          totalPages={usersData?.totalPages || 1}
          loading={false}
          emptyDescription="No users match your current filters."
        />
      </QueryState>
    </PageLayout>
  );
};
