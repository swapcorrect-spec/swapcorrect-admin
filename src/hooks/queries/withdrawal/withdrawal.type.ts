import type { DataItem } from "~/types/base";

export type WithdrawalStatus = "All" | "Pending" | "Treated";

export const WITHDRAWAL_STATUS_OPTIONS: {
  value: WithdrawalStatus;
  label: string;
}[] = [
  { value: "All", label: "All statuses" },
  { value: "Pending", label: "Pending" },
  { value: "Treated", label: "Treated" },
];

export interface WithdrawalItem extends DataItem {
  id?: string | number;
  withdrawalId?: string;
  status?: string;
}

export const getWithdrawalStatus = (item: WithdrawalItem): string => {
  const entry = Object.entries(item).find(
    ([key]) => key.toLowerCase() === "status",
  );
  return entry ? String(entry[1] ?? "") : String(item.status ?? "");
};

export const getWithdrawalId = (item: WithdrawalItem): string => {
  const withdrawalIdEntry = Object.entries(item).find(
    ([key]) => key.toLowerCase() === "withdrawalid",
  );
  if (withdrawalIdEntry) return String(withdrawalIdEntry[1] ?? "");

  if (item.withdrawalId) return String(item.withdrawalId);
  if (item.id != null) return String(item.id);
  return "";
};

export const isWithdrawalPending = (status?: string | null): boolean =>
  status?.trim().toLowerCase() === "pending";

export interface TreatWithdrawalPayload {
  withdrawalId: string;
  adminNote: string;
}

export interface TreatWithdrawalResponse {
  statusCode: number;
  displayMessage: string;
  result: unknown;
  errorMessages: string[] | null;
}

export interface WithdrawalsResult {
  items: WithdrawalItem[];
  totalCount: number;
  pageNumber: number;
  totalPages: number;
  pageSize: number;
}

export interface WithdrawalsResponse {
  statusCode: number;
  displayMessage: string;
  result: WithdrawalsResult;
  errorMessages: string[] | null;
}
