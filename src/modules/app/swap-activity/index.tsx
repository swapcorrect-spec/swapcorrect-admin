import { Flex } from "@chakra-ui/react";
import PageLayout from "~/modules/layout/page-layout";
import { Header, QueryState, Select } from "~/modules/shared";
import { useState } from "react";
import SwapActivityTable from "./_components/data-table";
import { useGetAdminSwapActivity } from "~/hooks/queries/swap-activity/swap-activity";
import {
  SWAP_ACTIVITY_FILTER_OPTIONS,
  type SwapActivityFilter,
} from "~/hooks/queries/swap-activity/swap-activity.type";
import type { SwapActivityData } from "~/types/base";

export const SwapActivity = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState<SwapActivityFilter>("AllTime");

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const {
    data: swapActivityData,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useGetAdminSwapActivity({
    enabler: true,
    pageNumber: currentPage,
    pageSize: 20,
    filter,
  });

  const swapActivityItems: SwapActivityData[] = (
    swapActivityData?.items || []
  ).map((item) => ({
    swapProceedId: item.id ?? "",
    ownerName: item.ownerName || "N/A",
    swapperName: item.swapperName || "N/A",
    ownerItem: item.ownerItem || "N/A",
    swapperItem: item.swapperItem || "N/A",
    status: item.status || "",
    initiatedOn: item.initiatedOn || "",
    lastActivity: item.lastActivity || "",
  }));

  return (
    <PageLayout>
      <Flex justifyContent="space-between" alignItems="center" mb={7}>
        <Header
          title="Swap Activity"
          description="Monitor and manage all swaps between users on the platform"
        />
        <Select
          name="swap-activity-filter"
          options={SWAP_ACTIVITY_FILTER_OPTIONS}
          value={filter}
          onChange={(value) => {
            setFilter(value as SwapActivityFilter);
            setCurrentPage(1);
          }}
          width="180px"
        />
      </Flex>

      <QueryState
        isLoading={isLoading || isFetching}
        isError={isError}
        error={error}
        onRetry={() => refetch()}
        isEmpty={swapActivityItems.length === 0}
        emptyProps={{
          title: "No swap activity",
          description:
            "There are no swaps matching your filters. Try adjusting the date range.",
        }}
        errorProps={{
          title: "Could not load swap activity",
          description:
            "We had trouble fetching swap activity. Please try again.",
        }}
      >
        <SwapActivityTable
          data={swapActivityItems}
          currentPage={currentPage}
          onPageChange={onPageChange}
          totalPages={swapActivityData?.totalPages || 1}
          loading={false}
          emptyDescription="No swap activity matches your current filters."
        />
      </QueryState>
    </PageLayout>
  );
};
