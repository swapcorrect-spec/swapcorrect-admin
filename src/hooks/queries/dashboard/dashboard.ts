import { useQuery } from "@tanstack/react-query";
import { DASHBOARD_SUMMARY } from "~/modules/_constants";
import { getRequestParams, getRequest } from "~/config/request-methods";
import type { DashboardSummaryResponse, AnalyticsResponse } from "./dashboard.type";

export const ADVANCED_ANALYTICS = "ADVANCED_ANALYTICS";

export const useGetDashboardSummary = (props: {
  enabler: boolean;
  filter?: "Today" | "ThisWeek" | "ThisMonth" | "AllTime";
}) => {
  const { enabler = true, filter = "Today" } = props;

  const { data, isError, isSuccess, isLoading, isFetching, error } = useQuery({
    queryKey: [DASHBOARD_SUMMARY, filter],
    queryFn: async ({ signal }) =>
      getRequestParams<
        { filter: string },
        DashboardSummaryResponse
      >({
        url: "/Admin/admin-dashboard-summary",
        params: { filter },
        config: { signal },
      }),
    enabled: !!enabler,
    staleTime: 2 * 60 * 1000, // 2 minutes - data stays fresh for 2 mins
    gcTime: 5 * 60 * 1000, // 5 minutes - cache persists for 5 mins
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

export const useGetAdvancedAnalytics = (props: {
  enabler: boolean;
  filter?: "Today" | "ThisWeek" | "ThisMonth" | "AllTime";
}) => {
  const { enabler = true, filter = "ThisMonth" } = props;

  const { data, isError, isSuccess, isLoading, isFetching, error } = useQuery({
    queryKey: [ADVANCED_ANALYTICS, filter],
    queryFn: async ({ signal }) => {
      return getRequest<AnalyticsResponse>({
        url: "/Admin/advanced-analytics",
      });
    },
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

