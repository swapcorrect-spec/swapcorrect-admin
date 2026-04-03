import { Box, Flex, Spinner } from "@chakra-ui/react";
import { Header, Tab } from "~/modules/shared";
import List from "./_components/list";
import PageLayout from "~/modules/layout/page-layout";
import type { SwapDetailsProps } from "~/types/base";
import { useState } from "react";
import { useGetListings } from "~/hooks/queries/listing/listing";
import type { SwapListingStatus, ListingItem } from "~/hooks/queries/listing/listing.type";

export const Listing: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Map tab values to API status values
  const getApiStatus = (status: string): SwapListingStatus => {
    const statusMap: Record<string, SwapListingStatus> = {
      all: "All",
      active: "Published",
      pending: "Negotiation",
      completed: "Swapped",
    };
    return statusMap[status] || "All";
  };

  const { data: listingsData, isLoading, isError, error } = useGetListings({
    enabler: true,
    swapListingStatus: getApiStatus(selectedStatus),
    pageNumber: currentPage,
    pageSize: 20,
  });

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
      title: "Completed",
      value: "completed",
    },
  ];

  const handleTabChange = (value: string) => {
    setSelectedStatus(value);
    setCurrentPage(1);
  };

  // Handle different possible response structures
  const rawListings: ListingItem[] = Array.isArray(listingsData)
    ? listingsData
    : listingsData?.items
    ? listingsData.items
    : [];

  // Map API response to SwapDetailsProps structure
  const listings: SwapDetailsProps[] = rawListings.map((item: ListingItem) => {
    // Get first media item (image, video, or document)
    const firstMedia = item.media?.[0];
    const itemUrl = firstMedia?.url || "";
    const isVideo = firstMedia?.mediaType === "Video";
    const mediaType = firstMedia?.mediaType || "Image";

    // Map reviewStage to status
    const statusMap: Record<string, string> = {
      Pending: "Pending",
      Published: "Active",
      Negotiation: "Pending",
      Swapped: "Completed",
    };
    const status = statusMap[item.reviewStage] || item.reviewStage || "Pending";

    return {
      name: item.itemName || "",
      condition: item.itemCondition || "",
      price: item.estimatedAmount || 0,
      itemUrl,
      isVideo,
      mediaType,
      category: item.categoryName || "",
      status,
      description: item.itemDescription || "",
      location: "", // Not in API response
      dateListed: "", // Not in API response
      datePosted: "", // Not in API response
      edited: "", // Not in API response
      requestedInExchange: item.swapListRequest || [],
      owner: item.fullName || "",
      ownerAvatar: item.profilePicture || "",
      ownerId: item.userId || "", // Add userId for owner profile modal
      listingId: item.listingId || "", // Add listingId for details API call
      rating: item.rating || 0,
      swap: {
        total: item.swapCount || 0,
      },
    };
  });

  return (
    <PageLayout>
      <Header
        title="Listing Management"
        description="Manage your listings and track your swap activity"
      />
      <Box mt="32px">
        <Tab
          options={listingStatus}
          value={selectedStatus}
          onValueChange={handleTabChange}
        />

        <Flex direction="column" gap={6} mt={6}>
          {isLoading ? (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              minH="400px"
              w="100%"
            >
              <Spinner size="xl" color="#007AFF" />
            </Box>
          ) : isError ? (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              minH="400px"
              color="#E42222"
            >
              Error loading listings: {error?.message || "Unknown error"}
            </Box>
          ) : listings.length === 0 ? (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              minH="400px"
              color="#737373"
            >
              No listings found
            </Box>
          ) : (
            listings.map((list: SwapDetailsProps, idx: number) => (
              <List key={list.name + idx} item={list} />
            ))
          )}
        </Flex>
      </Box>
    </PageLayout>
  );
};
