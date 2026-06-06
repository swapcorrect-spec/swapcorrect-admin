import { Box, Flex, Grid } from "@chakra-ui/react";
import { Header, Input, QueryState, Select } from "~/modules/shared";
import List from "./_components/list";
import PageLayout from "~/modules/layout/page-layout";
import type { SwapDetailsProps } from "~/types/base";
import { useState } from "react";
import { useGetListings } from "~/hooks/queries/listing/listing";
import {
  resolveListingSwapStatusLabel,
  SWAP_LISTING_STATUS_OPTIONS,
  type ListingDate,
  type ListingItem,
  type ReviewStage,
  type SwapListingStatus,
} from "~/hooks/queries/listing/listing.type";
import { useDebouncedValue } from "~/hooks/useDebouncedValue";
import { Pagination } from "~/modules/shared/pagination";

const REVIEW_STAGE_OPTIONS: { value: ReviewStage; label: string }[] = [
  { value: "All", label: "All review stages" },
  { value: "Pending", label: "Pending" },
  { value: "Approved", label: "Approved" },
  { value: "Rejected", label: "Rejected" },
];

const LISTING_DATE_OPTIONS: { value: ListingDate; label: string }[] = [
  { value: "All", label: "All time" },
  { value: "LastWeek", label: "Last week" },
  { value: "LastMonth", label: "Last month" },
];

const mapListingItem = (item: ListingItem): SwapDetailsProps => {
  const firstMedia = item.media?.[0];
  const itemUrl = firstMedia?.url || "";
  const isVideo = firstMedia?.mediaType === "Video";
  const mediaType = firstMedia?.mediaType || "Image";

  const status = resolveListingSwapStatusLabel(item);

  return {
    name: item.itemName || "",
    condition: item.itemCondition || "",
    price: item.estimatedAmount || 0,
    estimatedCurrency: item.estimatedCurrency,
    itemUrl,
    isVideo,
    mediaType,
    category: item.categoryName || "",
    listType: item.listType || "",
    status,
    reviewStage: item.reviewStage,
    isFlagged: item.isFlagged ?? false,
    description: item.itemDescription || "",
    location: "",
    dateListed: "",
    datePosted: "",
    edited: "",
    requestedInExchange: item.swapListRequest || [],
    owner: item.fullName || "",
    ownerAvatar: item.profilePicture || "",
    ownerId: item.userId || "",
    listingId: item.listingId || "",
    rating: item.rating || 0,
    swap: {
      total: item.swapCount || 0,
    },
  };
};

export const Listing: React.FC = () => {
  const [searchInput, setSearchInput] = useState("");
  const [swapListingStatus, setSwapListingStatus] =
    useState<SwapListingStatus>("All");
  const [reviewStage, setReviewStage] = useState<ReviewStage>("All");
  const [listingDate, setListingDate] = useState<ListingDate>("All");
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedSearch = useDebouncedValue(searchInput, 400);

  const {
    data: listingsData,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useGetListings({
      enabler: true,
      searchParam: debouncedSearch,
      swapListingStatus,
      reviewStage,
      listingDate,
      pageNumber: currentPage,
      pageSize: 20,
    });

  const resetPage = () => setCurrentPage(1);

  const rawListings: ListingItem[] = Array.isArray(listingsData)
    ? listingsData
    : listingsData?.items ?? [];

  const listings = rawListings.map(mapListingItem);

  const totalPages = (() => {
    if (Array.isArray(listingsData)) return 1;
    if (listingsData?.totalPages) return listingsData.totalPages;
    if (listingsData?.totalCount && listingsData?.pageSize) {
      return Math.max(1, Math.ceil(listingsData.totalCount / listingsData.pageSize));
    }
    return 1;
  })();

  return (
    <PageLayout>
      <Header
        title="Listing Management"
        description="Manage your listings and track your swap activity"
      />
      <Box mt="32px">
        <Flex direction="column" gap={4}>
          <Input
            type="search"
            name="listing-search"
            label="Search"
            placeholder="Search by item name, user, or keyword..."
            value={searchInput}
            handleChange={(e) => {
              setSearchInput(e.target.value);
              resetPage();
            }}
          />
          <Grid
            templateColumns={{
              base: "1fr",
              md: "repeat(3, 1fr)",
            }}
            gap={4}
          >
            <Select
              name="swap-listing-status"
              placeholder="Swap status"
              options={SWAP_LISTING_STATUS_OPTIONS}
              value={swapListingStatus}
              onChange={(val) => {
                setSwapListingStatus(val as SwapListingStatus);
                resetPage();
              }}
            />
            <Select
              name="review-stage"
              placeholder="Review stage"
              options={REVIEW_STAGE_OPTIONS}
              value={reviewStage}
              onChange={(val) => {
                setReviewStage(val as ReviewStage);
                resetPage();
              }}
            />
            <Select
              name="listing-date"
              placeholder="Listing date"
              options={LISTING_DATE_OPTIONS}
              value={listingDate}
              onChange={(val) => {
                setListingDate(val as ListingDate);
                resetPage();
              }}
            />
          </Grid>
        </Flex>

        <Flex direction="column" gap={6} mt={6}>
          <QueryState
            isLoading={isLoading || isFetching}
            isError={isError}
            error={error}
            onRetry={() => refetch()}
            isEmpty={listings.length === 0}
            emptyProps={{
              title: "No listings found",
              description:
                "No listings match your filters. Try adjusting search or filters.",
            }}
            errorProps={{
              title: "Could not load listings",
              description:
                "We had trouble fetching your listings. Please try again.",
            }}
          >
            {listings.map((list: SwapDetailsProps, idx: number) => (
              <List key={list.listingId || list.name + idx} item={list} />
            ))}
          </QueryState>
          {!isError && (
            <Box mt={6}>
              <Pagination
                currentPage={currentPage}
                totalPages={Math.max(1, totalPages)}
                onPageChange={setCurrentPage}
              />
            </Box>
          )}
        </Flex>
      </Box>
    </PageLayout>
  );
};
