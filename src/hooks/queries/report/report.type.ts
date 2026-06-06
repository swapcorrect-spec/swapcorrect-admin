export type ReportUserStatus =
  | "All"
  | "New"
  | "UnderReview"
  | "Resolved"
  | "Dismissed";

export type ReportDateFilter = "All" | "LastWeek" | "LastMonth";

export interface ReportListItem {
  reportId?: string;
  reporterName?: string;
  reporter?: string;
  reportedByName?: string;
  reportedUserName?: string;
  reportedEntity?: string;
  reportType?: string;
  type?: string;
  reason?: string;
  description?: string;
  status?: string;
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

export interface ReportDetailsResponse {
  statusCode: number;
  displayMessage: string;
  result: Record<string, unknown>;
  errorMessages: string[] | null;
}
