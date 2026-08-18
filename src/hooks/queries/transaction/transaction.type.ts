import type { DataItem } from "~/types/base";

export type TransactionDateFilter = "All" | "LastWeek" | "LastMonth";

export const TRANSACTION_DATE_FILTER_OPTIONS: {
  value: TransactionDateFilter;
  label: string;
}[] = [
  { value: "All", label: "All time" },
  { value: "LastWeek", label: "Last week" },
  { value: "LastMonth", label: "Last month" },
];

export interface TransactionItem extends DataItem {
  transactionId: string;
  userId: string;
  userFullName: string;
  userEmail: string;
  amount: string;
  feeType: string;
  paymentType: string;
  paymentChannel: string;
  paymentStatus: string;
  description: string;
  swapId: string;
  roomName: string;
  createdPaymentTime: string;
  completePaymentTime: string | null;
}

export interface TransactionsResult {
  items: TransactionItem[];
  totalCount: number;
  pageNumber: number;
  totalPages: number;
  pageSize: number;
}

export interface TransactionsResponse {
  statusCode: number;
  displayMessage: string;
  result: TransactionsResult;
  errorMessages: string[] | null;
}

export interface TransactionStatsBreakdownItem {
  label: string;
  count: number;
  totalRevenue: number;
}

export interface TransactionStatsResult {
  totalTransactions: number;
  totalRevenue: number;
  successCount: number;
  successRevenue: number;
  pendingCount: number;
  pendingRevenue: number;
  failedCount: number;
  failedRevenue: number;
  todayCount: number;
  todayRevenue: number;
  thisWeekCount: number;
  thisWeekRevenue: number;
  thisMonthCount: number;
  thisMonthRevenue: number;
  byFeeType: TransactionStatsBreakdownItem[];
  byPaymentType: TransactionStatsBreakdownItem[];
  byPaymentChannel: TransactionStatsBreakdownItem[];
}

export interface TransactionStatsResponse {
  statusCode: number;
  displayMessage: string;
  result: TransactionStatsResult;
  errorMessages: string[] | null;
}
