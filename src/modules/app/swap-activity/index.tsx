import { Flex } from "@chakra-ui/react";
import PageLayout from "~/modules/layout/page-layout";
import { Header, QueryState } from "~/modules/shared";
import { useState } from "react";
import SwapActivityTable from "./_components/data-table";
import { useSearchSwaps } from "~/hooks/queries/swap-activity/swap-activity";

export const SwapActivity = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [swapListingStatus, setSwapListingStatus] = useState<
  "Published" | "Negotiation" | "Swapped" | "All"
>("All");
const [listingDate, setListingDate] = useState<"All" | "LastWeek" | "LastMonth">("All");  
  
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
  } = useSearchSwaps({
    enabler: true,
    pageNumber: currentPage,
    perpageSize: 20,
    swapListingStatus,
    listingDate
  });

  const swapActivityItems = (swapActivityData?.items || []).map((item: any) => {
    const requestItems = Array.isArray(item.swapperRequestItem)
      ? item.swapperRequestItem
      : [item.swapperRequestItem];
    const listedItems = Array.isArray(item.listedItem)
      ? item.listedItem
      : [item.listedItem];

    return {
      swapperRequestItem: requestItems.filter(Boolean).join(", ") || "",
      listedItem: listedItems.filter(Boolean).join(", ") || "",
      swapperOne: item.swapperName || "",
      swapperTwo: item.visitorName || "",
      swapperImage: item.swapperImage || "",
      visitorImage: item.visitorImage || "",
      status: item.status || "",
      createdAt: item.createdOn || "",
      updatedAt: item.lastActivity || "",
      swapProceedId: item.swapProceedId || "",
      isFlagged: item.isFlagged ?? false,
    };
  });

  return (
    <PageLayout>
      <Flex justifyContent="space-between" alignItems="center" mb={7}>
        <Header
          title="Swap Activity"
          description="Monitor and manage all swaps between users on the platform"
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
            "There are no swaps matching your filters. Try adjusting the status or date range.",
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
