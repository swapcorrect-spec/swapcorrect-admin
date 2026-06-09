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
  evidenceImg: string[];
  created: string;
}

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
