import { useQuery } from "@tanstack/react-query";
import { getRequestParams } from "~/config/request-methods";
import type { RecentActivitiesResponse } from "./activity.type";

export const RECENT_ACTIVITIES = "RECENT_ACTIVITIES";

export const useGetRecentActivities = (props: {
  enabler: boolean;
  pageNumber?: number;
  pageSize?: number;
}) => {
  const { enabler = true, pageNumber = 1, pageSize = 10 } = props;

  const { data, isError, isSuccess, isLoading, isFetching, error } = useQuery({
    queryKey: [RECENT_ACTIVITIES, pageNumber, pageSize],
    queryFn: async ({ signal }) =>
      getRequestParams<
        { pageNumber: number; pageSize: number },
        RecentActivitiesResponse
      >({
        url: "/Admin/recent-activities",
        params: { pageNumber, pageSize },
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

