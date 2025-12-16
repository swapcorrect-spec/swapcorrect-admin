import { Flex } from "@chakra-ui/react";
import PageLayout from "~/modules/layout/page-layout";
import { Header } from "~/modules/shared";
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

  const { data: swapActivityData, isLoading, isFetching } = useSearchSwaps({
    enabler: true,
    pageNumber: currentPage,
    perpageSize: 20,
    swapListingStatus,
    listingDate
  });

  const swapActivityItems = (swapActivityData?.items || []).map((item: any) => {
    const ownerItems = Array.isArray(item.swapperRequestItem) ? item.swapperRequestItem : [item.swapperRequestItem];
    const swapperItems = Array.isArray(item.swapperItem) ? item.swapperItem : [item.swapperItem];
    const listedItems = Array.isArray(item.listedItem) ? item.listedItem : [item.listedItem];
    
    const getInitials = (name: string) => {
      if (!name) return "N/A";
      const parts = name.trim().split(" ");
      if (parts.length >= 2) {
        return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
      }
      return name.substring(0, 2).toUpperCase();
    };

    return {
      itemOne: ownerItems.join(", "),
      itemTwo: swapperItems.join(", "),
      listedItem: listedItems.join(", "),
      swapperOne: item.swapperName || "",
      swapperTwo: item.visitorName || "",
      swapperImage: item.swapperImage || "",
      visitorImage: item.visitorImage || "",
      status: item.status || "",
      createdAt: item.createdOn || "",
      updatedAt: item.lastActivity || "",
      swapProceedId: item.swapProceedId || "",
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

      <SwapActivityTable
        data={swapActivityItems}
        currentPage={currentPage}
        onPageChange={onPageChange}
        totalPages={swapActivityData?.totalPages || 1}
        loading={isLoading || isFetching}
      />
    </PageLayout>
  );
};
