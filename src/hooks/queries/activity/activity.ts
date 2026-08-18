import { useQuery } from "@tanstack/react-query";
import { getRequestParams } from "~/config/request-methods";
import type { RecentActivitiesResponse } from "./activity.type";

export const RECENT_ACTIVITIES = "RECENT_ACTIVITIES";

export const useGetRecentActivities = (props: {
  enabler: boolean;
  pageNumber?: number;
  pageSize?: number;
  userId?: string;
}) => {
  const { enabler = true, pageNumber = 1, pageSize = 10, userId } = props;

  const { data, isError, isSuccess, isLoading, isFetching, error, refetch } =
    useQuery({
      queryKey: [RECENT_ACTIVITIES, pageNumber, pageSize, userId],
      queryFn: async ({ signal }) =>
        getRequestParams<
          { pageNumber: number; pageSize: number; userId?: string },
          RecentActivitiesResponse
        >({
          url: "/Admin/recent-activities",
          params: {
            pageNumber,
            pageSize,
            userId: userId || undefined,
          },
          config: { signal },
        }),
      enabled: !!enabler,
      staleTime: 2 * 60 * 1000,
      gcTime: 5 * 60 * 1000,
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

