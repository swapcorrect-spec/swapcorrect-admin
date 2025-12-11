// Swap Activity API Response Types

export type SwapActivityFilter = "Today" | "ThisWeek" | "ThisMonth" | "AllTime";

export interface SwapActivityItem {
  ownerName: string;
  swapperName: string;
  ownerItem: string | string[];
  swapperItem: string | string[];
  status: string;
  initiatedOn: string;
  lastActivity: string;
}

export interface SwapActivityResult {
  items: SwapActivityItem[];
  totalCount: number;
  pageNumber: number;
  totalPages: number;
  pageSize: number;
}

export interface SwapActivityResponse {
  statusCode: number;
  displayMessage: string;
  result: SwapActivityResult;
  errorMessages: string[] | null;
}

