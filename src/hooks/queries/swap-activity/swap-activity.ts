import { useQuery } from "@tanstack/react-query";
import { getRequestParams } from "~/config/request-methods";
import type {
  SwapProceedingResponse,
  SwapSearchResponseInterface,
} from "./swap-activity.type";

export const SWAP_PROCEEDING = "SWAP_PROCEEDING";

export interface UseSearchSwapsProps {
  enabler: boolean;
  listingUserId?: string;
  searhParam?: string;
  swapListingStatus?: "Published" | "Negotiation" | "Swapped" | "All";
  listingDate?: "All" | "LastWeek" | "LastMonth";
  pageNumber?: number;
  perpageSize?: number;
}

export const useSearchSwaps = (props: UseSearchSwapsProps) => {
  const {
    enabler,
    listingUserId,
    searhParam,
    swapListingStatus,
    listingDate,
    pageNumber = 1,
    perpageSize = 20,
  } = props;

  const { data, isError, isSuccess, isLoading, isFetching, error, refetch } =
    useQuery({
    queryKey: [
      "useSearchSwaps",
      listingUserId,
      searhParam,
      swapListingStatus,
      listingDate,
      pageNumber,
      perpageSize,
    ],
    queryFn: async ({ signal }) =>
      getRequestParams<
        {
          listingUserId?: string;
          searhParam?: string;
          swapListingStatus?: string;
          listingDate?: string;
          pageNumber?: number;
          perpageSize?: number;
        },
        SwapSearchResponseInterface
      >({
        url: "/listing_item/paginated/search_swap",
        params: {
          listingUserId,
          searhParam,
          swapListingStatus,
          listingDate,
          pageNumber,
          perpageSize,
        },
        config: { signal },
      }),
    enabled: !!enabler,
  });

  return {
    data: data?.result,
    isLoading,
    isFetching,
    isError,
    error,
    isSuccess,
    refetch,
  };
};


export const useGetSwapProceeding = (props: {
  swapProceedId: string;
  enabler: boolean;
}) => {
  const { swapProceedId, enabler } = props;
  const { data, isError, isSuccess, isLoading, isFetching, error, refetch } =
    useQuery({
      queryKey: [SWAP_PROCEEDING, swapProceedId],
      queryFn: async ({ signal }) =>
        getRequestParams<
          { swapProceedId: string },
          SwapProceedingResponse
        >({
          url: "/listing_item/single-swap-proceeding",
          params: { swapProceedId },
          config: { signal },
        }),
      enabled: !!enabler && !!swapProceedId,
    });

  return {
    data: data?.result,
    isLoading,
    isFetching,
    isError,
    error,
    isSuccess,
    refetch,
  };
};