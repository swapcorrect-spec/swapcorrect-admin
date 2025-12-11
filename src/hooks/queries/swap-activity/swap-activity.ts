import { useQuery } from "@tanstack/react-query";
import { getRequestParams } from "~/config/request-methods";
import type { SwapActivityResponse, SwapActivityFilter } from "./swap-activity.type";

export const SWAP_ACTIVITY = "SWAP_ACTIVITY";

export const useGetSwapActivity = (props: {
  enabler: boolean;
  pageNumber?: number;
  pageSize?: number;
  filter?: SwapActivityFilter;
}) => {
  const {
    enabler = true,
    pageNumber = 1,
    pageSize = 10,
    filter = "AllTime",
  } = props;

  const { data, isError, isSuccess, isLoading, isFetching, error } = useQuery({
    queryKey: [SWAP_ACTIVITY, pageNumber, pageSize, filter],
    queryFn: async ({ signal }) =>
      getRequestParams<
        {
          pageNumber: number;
          pageSize: number;
          filter?: string;
        },
        SwapActivityResponse
      >({
        url: "/Admin/swaps-activity",
        params: {
          pageNumber,
          pageSize,
          filter,
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

