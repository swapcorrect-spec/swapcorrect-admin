export type ReportUserStatus =
  | "All"
  | "New"
  | "UnderReview"
  | "Resolved"
  | "Dismissed";

export type ReportDateFilter =
  | "All"
  | "Today"
  | "ThisWeek"
  | "ThisMonth"
  | "AllTime";

export const REPORT_STATUS_OPTIONS: {
  value: ReportUserStatus;
  label: string;
}[] = [
  { value: "All", label: "All" },
  { value: "New", label: "New" },
  { value: "UnderReview", label: "Under Review" },
  { value: "Resolved", label: "Resolved" },
  { value: "Dismissed", label: "Dismissed" },
];

export const REPORT_DATE_FILTER_OPTIONS: {
  value: ReportDateFilter;
  label: string;
}[] = [
  { value: "All", label: "All Time" },
  { value: "Today", label: "Today" },
  { value: "ThisWeek", label: "This Week" },
  { value: "ThisMonth", label: "This Month" },
  { value: "AllTime", label: "All Time" },
];

export interface ReportListItem {
  reportId?: string;
  reporterId?: string;
  reporterName?: string;
  reporterImg?: string | null;
  reporter?: string;
  reportedByName?: string;
  reportedPersonId?: string;
  reportedPersonName?: string;
  reportedPersonImg?: string | null;
  reportedUserName?: string;
  reportedEntity?: string;
  reportType?: string;
  type?: string;
  reason?: string;
  description?: string;
  status?: string;
  created?: string;
  createdOn?: string;
  createdAt?: string;
}

export interface ReportsPaginatedResult {
  items?: ReportListItem[];
  totalCount?: number;
  pageNumber?: number;
  totalPages?: number;
  pageSize?: number;
}

export interface ReportsPaginatedResponse {
  statusCode: number;
  displayMessage: string;
  result: ReportsPaginatedResult;
  errorMessages: string[] | null;
}

export interface ReportDetails {
  reportId: string;
  reporterId: string;
  reporterName: string;
  reporterImg: string | null;
  reportedPersonId: string;
  reportedPersonName: string;
  reportedPersonImg: string | null;
  reportedPersonRating: string;
  reportedPersonTotalSwap: string;
  reportType: string;
  reason: string;
  status: string;
  notes: string[];
  evidenceImg: ReportEvidenceApiItem[];
  created: string;
}

export interface ReportEvidenceMedia {
  mediaType: string;
  url: string;
}

/** Raw API shape — `MediaType` / `Url` or camelCase equivalents. */
export type ReportEvidenceApiItem = Record<string, unknown>;

export interface ReportDetailsResponse {
  statusCode: number;
  displayMessage: string;
  result: ReportDetails;
  errorMessages: string[] | null;
}

export type AddReportNotePayload = {
  note: string;
  reportId: string;
};

export interface AddReportNoteResponse {
  statusCode: number;
  displayMessage: string;
  result: unknown;
  errorMessages: string[] | null;
}

export type ReportStatusValue = Exclude<ReportUserStatus, "All">;

export type ChangeReportStatusPayload = {
  reportId: string;
  status: ReportStatusValue;
};

export interface ChangeReportStatusResponse {
  statusCode: number;
  displayMessage: string;
  result: unknown;
  errorMessages: string[] | null;
}
