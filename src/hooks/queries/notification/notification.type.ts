export type NotificationType =
  | "Swap"
  | "Withdrawal"
  | "Payment"
  | "Account"
  | "Security"
  | "System"
  | "Dispute"
  | "Report"
  | "Chat"
  | string;

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  referenceId: string | null;
  isRead: boolean;
  createdAt: string;
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
