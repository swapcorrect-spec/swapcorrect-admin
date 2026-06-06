import { useQuery } from "@tanstack/react-query";
import { getRequestParams } from "~/config/request-methods";
import type {
  ReportDateFilter,
  ReportDetailsResponse,
  ReportListItem,
  ReportsPaginatedResponse,
  ReportUserStatus,
} from "./report.type";

export const REPORTS = "REPORTS";
export const REPORT_DETAILS = "REPORT_DETAILS";

const formatReportStatus = (status?: string) => {
  if (!status) return "New";
  if (status === "UnderReview") return "Under Review";
  return status;
};

export const mapReportToTableRow = (item: ReportListItem) => ({
  reportId: item.reportId ?? "",
  reporter:
    item.reporterName ?? item.reporter ?? item.reportedByName ?? "—",
  type: item.reportType ?? item.type ?? "—",
  reportedEntity:
    item.reportedUserName ?? item.reportedEntity ?? "—",
  reason: item.reason ?? item.description ?? "—",
  status: formatReportStatus(item.status),
  createdAt: item.createdOn ?? item.createdAt ?? "",
});

export const useGetReports = (props: {
  enabler: boolean;
  searhParam?: string;
  status?: ReportUserStatus;
  reportFilerDate?: ReportDateFilter;
  pageNumber?: number;
  perpageSize?: number;
}) => {
  const {
    enabler = true,
    searhParam,
    status = "All",
    reportFilerDate = "All",
    pageNumber = 1,
    perpageSize = 20,
  } = props;

  const { data, isError, isSuccess, isLoading, isFetching, error, refetch } =
    useQuery({
      queryKey: [
        REPORTS,
        searhParam,
        status,
        reportFilerDate,
        pageNumber,
        perpageSize,
      ],
      queryFn: async ({ signal }) =>
        getRequestParams<
          {
            searhParam?: string;
            status?: ReportUserStatus;
            reportFilerDate?: ReportDateFilter;
            pageNumber?: number;
            perpageSize?: number;
          },
          ReportsPaginatedResponse
        >({
          url: "/report/paginated/all",
          params: {
            searhParam,
            status: status === "All" ? undefined : status,
            reportFilerDate:
              reportFilerDate === "All" ? undefined : reportFilerDate,
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

export const useGetReportDetails = (props: {
  reportId: string;
  enabler: boolean;
}) => {
  const { reportId, enabler } = props;

  const { data, isError, isSuccess, isLoading, isFetching, error, refetch } =
    useQuery({
      queryKey: [REPORT_DETAILS, reportId],
      queryFn: async ({ signal }) =>
        getRequestParams<{ reportId: string }, ReportDetailsResponse>({
          url: "/report/single/details",
          params: { reportId },
          config: { signal },
        }),
      enabled: !!enabler && !!reportId,
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
