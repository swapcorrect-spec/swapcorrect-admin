import type { DataItem } from "~/types/base";

export interface NotificationItem extends DataItem {
  id?: string | number;
}

export interface NotificationsResult {
  items: NotificationItem[];
  totalCount: number;
  pageNumber: number;
  totalPages: number;
  pageSize: number;
}

export interface NotificationsResponse {
  statusCode: number;
  displayMessage: string;
  result: NotificationsResult;
  errorMessages: string[] | null;
}
