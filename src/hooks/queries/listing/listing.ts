import { useQuery } from "@tanstack/react-query";
import { getRequestParams, getRequest } from "~/config/request-methods";
import type { ListingsResponse, SwapListingStatus, ListingDate, ListingDetailsResponse, ListingItem } from "./listing.type";

export const LISTINGS = "LISTINGS";

export const useGetListings = (props: {
  enabler: boolean;
  userId?: string;
  searchParam?: string;
  listingUserId?: string;
  categoryId?: string;
  location?: string;
  lowestRange?: number;
  highestRange?: number;
  swapListingStatus?: SwapListingStatus;
  listingDate?: ListingDate;
  pageNumber?: number;
  pageSize?: number;
}) => {
  const {
    enabler = true,
    userId,
    searchParam,
    listingUserId,
    categoryId,
    location,
    lowestRange,
    highestRange,
    swapListingStatus = "All",
    listingDate = "All",
    pageNumber = 1,
    pageSize = 20,
  } = props;

  const { data, isError, isSuccess, isLoading, isFetching, error } = useQuery({
    queryKey: [
      LISTINGS,
      userId,
      searchParam,
      listingUserId,
      categoryId,
      location,
      lowestRange,
      highestRange,
      swapListingStatus,
      listingDate,
      pageNumber,
      pageSize,
    ],
    queryFn: async ({ signal }) =>
      getRequestParams<
        {
          userId?: string;
          searchParam?: string;
          listingUserId?: string;
          categoryId?: string;
          location?: string;
          lowestRange?: number;
          highestRange?: number;
          swapListingStatus?: string;
          listingDate?: string;
          pageNumber: number;
          pageSize: number;
        },
        ListingsResponse
      >({
        url: "/Admin/paginated/search_item",
        params: {
          userId,
          searchParam,
          listingUserId,
          categoryId,
          location,
          lowestRange,
          highestRange,
          swapListingStatus,
          listingDate,
          pageNumber,
          pageSize,
        },
        config: { signal },
      }),
    enabled: !!enabler,
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    data: data?.result,
    isLoading,
    isFetching,
    isError,
    error,
    isSuccess,
  };
};

export const LISTING_DETAILS = "LISTING_DETAILS";

export const useGetListingDetails = (props: { 
  enabler: boolean;
  listingId: string;
}) => {
  const { enabler, listingId } = props;
  const { data, isError, isSuccess, isLoading, isFetching, error } = useQuery({
    queryKey: [LISTING_DETAILS, listingId],
    queryFn: () =>
      getRequest<ListingDetailsResponse>({
        url: `/listing_item/listing_details?listingId=${listingId}`,
      }),
    enabled: !!enabler && !!listingId,
  });

  return {
    data: data?.result,
    isLoading,
    isFetching,
    isError,
    error,
    isSuccess,
  };
};

