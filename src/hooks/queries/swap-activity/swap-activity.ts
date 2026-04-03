import { useQuery } from "@tanstack/react-query";
import { getRequestParams } from "~/config/request-methods";
import type { SwapSearchResponseInterface,IGetSwapInfoResponseData } from "./swap-activity.type";

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

  const { data, isError, isSuccess, isLoading, isFetching, error } = useQuery({
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
  };
};


export const useGetSwapInfo = (props: { swapId: string; enabler: boolean }) => {
  const { swapId, enabler } = props;
  const { data, isError, isSuccess, isLoading, isFetching, error } = useQuery({
    queryKey: ["useGetGeneralUserInfo", swapId],
    queryFn: () =>
      getRequestParams<{}, IGetSwapInfoResponseData>({
        url: "/auth/general/user/info",
        params: { swapId },
      }),
    enabled: !!enabler && !!swapId,
  });

  return {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    isSuccess,
  };
};