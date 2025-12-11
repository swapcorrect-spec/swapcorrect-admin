import { Flex } from "@chakra-ui/react";
import PageLayout from "~/modules/layout/page-layout";
import { Header } from "~/modules/shared";
import { useState } from "react";
import SwapActivityTable from "./_components/data-table";
import { useGetSwapActivity } from "~/hooks/queries/swap-activity/swap-activity";
import type { SwapActivityFilter } from "~/hooks/queries/swap-activity/swap-activity.type";

export const SwapActivity = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState<SwapActivityFilter>("AllTime");
  
  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const { data: swapActivityData, isLoading, isFetching } = useGetSwapActivity({
    enabler: true,
    pageNumber: currentPage,
    pageSize: 10,
    filter,
  });

  // Map API response to SwapActivityData structure
  // API fields: ownerName, swapperName, ownerItem (string|array), swapperItem (string|array), status, initiatedOn, lastActivity
  const swapActivityItems = (swapActivityData?.items || []).map((item: any) => {
    // Handle ownerItem and swapperItem as arrays or strings
    const ownerItems = Array.isArray(item.ownerItem) ? item.ownerItem : [item.ownerItem];
    const swapperItems = Array.isArray(item.swapperItem) ? item.swapperItem : [item.swapperItem];
    
    // Get initials from names
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
      swapperOne: item.ownerName || "",
      swapperTwo: item.swapperName || "",
      swapperOneInitials: getInitials(item.ownerName || ""),
      swapperTwoInitials: getInitials(item.swapperName || ""),
      status: item.status || "",
      createdAt: item.initiatedOn || "",
      updatedAt: item.lastActivity || "",
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
