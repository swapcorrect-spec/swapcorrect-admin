import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getRequestParams, postRequest } from "~/config/request-methods";
import type { MutationProps } from "~/types/mutation-prop-types";
import handleApiError from "~/utils/handle-api-error";
import type {
  AddReportNotePayload,
  AddReportNoteResponse,
  ChangeReportStatusPayload,
  ChangeReportStatusResponse,
  ReportDateFilter,
  ReportDetailsResponse,
  ReportEvidenceMedia,
  ReportListItem,
  ReportsPaginatedResponse,
  ReportUserStatus,
} from "./report.type";

const getCaseInsensitiveString = (
  record: Record<string, unknown>,
  key: string,
) => {
  const entry = Object.entries(record).find(
    ([recordKey]) => recordKey.toLowerCase() === key.toLowerCase(),
  );
  return typeof entry?.[1] === "string" ? entry[1].trim() : "";
};

export const normalizeReportEvidence = (
  items?: unknown[],
): ReportEvidenceMedia[] => {
  if (!Array.isArray(items)) return [];

  return items
    .map((item) => {
      if (typeof item === "string") {
        const url = item.trim();
        return url ? { mediaType: "", url } : null;
      }

      if (!item || typeof item !== "object") return null;

      const record = item as Record<string, unknown>;
      const url = getCaseInsensitiveString(record, "url");
      if (!url) return null;

      return {
        mediaType: getCaseInsensitiveString(record, "mediatype"),
        url,
      };
    })
    .filter((item): item is ReportEvidenceMedia => item !== null);
};

export const isReportClosed = (status?: string) => {
  const normalized = status?.trim().toLowerCase().replace(/\s+/g, "") ?? "";
  return normalized === "resolved" || normalized === "dismissed";
};

export const isReportUnderReview = (status?: string) => {
  const normalized = status?.trim().toLowerCase().replace(/\s+/g, "") ?? "";
  return normalized === "underreview";
};

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

export const useAddReportNote = (props: MutationProps) => {
  const { onSuccess, onError } = props;
  const queryClient = useQueryClient();

  const { mutate, isError, isSuccess, isPending } = useMutation({
    mutationFn: (payload: AddReportNotePayload) =>
      postRequest<AddReportNotePayload, AddReportNoteResponse>({
        url: "/report/Add/report/note",
        payload,
      }),
    onSuccess(values, variables) {
      queryClient.invalidateQueries({
        queryKey: [REPORT_DETAILS, variables.reportId],
      });
      onSuccess(values);
    },
    onError(err) {
      const msgError = handleApiError(err);
      onError?.(msgError, err);
    },
  });

  return {
    mutate,
    isError,
    isSuccess,
    isPending,
  };
};

export const useChangeReportStatus = (props: MutationProps) => {
  const { onSuccess, onError } = props;
  const queryClient = useQueryClient();

  const { mutate, isError, isSuccess, isPending } = useMutation({
    mutationFn: (payload: ChangeReportStatusPayload) =>
      postRequest<ChangeReportStatusPayload, ChangeReportStatusResponse>({
        url: "/report/change/report/status",
        payload,
      }),
    onSuccess(values, variables) {
      queryClient.invalidateQueries({
        queryKey: [REPORT_DETAILS, variables.reportId],
      });
      queryClient.invalidateQueries({ queryKey: [REPORTS] });
      onSuccess(values);
    },
    onError(err) {
      const msgError = handleApiError(err);
      onError?.(msgError, err);
    },
  });

  return {
    mutate,
    isError,
    isSuccess,
    isPending,
  };
};
