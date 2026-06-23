export interface AdminSwapActivityItem {
  id: string | null;
  ownerName: string;
  swapperName: string;
  ownerItem: string;
  swapperItem: string;
  status: string;
  initiatedOn: string;
  lastActivity: string;
}

export interface AdminSwapActivityResponse {
  statusCode: number;
  displayMessage: string;
  result: {
    items?: AdminSwapActivityItem[];
    totalPages?: number;
    pageNumber?: number;
    totalCount?: number;
    pageSize?: number;
  };
  errorMessages: null | string;
}

export interface SwapSearchResponseInterface {
  statusCode: number;
  displayMessage: string;
  result: {
    items?: SwapProceedingItem[];
    totalPages?: number;
    pageNumber?: number;
    totalCount?: number;
    pageSize?: number;
  };
  errorMessages: null | string;
}

export type SwapActivityFilter = "Today" | "ThisWeek" | "ThisMonth" | "AllTime";

export const SWAP_ACTIVITY_FILTER_OPTIONS: {
  value: SwapActivityFilter;
  label: string;
}[] = [
  { value: "Today", label: "Today" },
  { value: "ThisWeek", label: "This Week" },
  { value: "ThisMonth", label: "This Month" },
  { value: "AllTime", label: "All Time" },
];

export interface SwapProceedingItem {
  swapProceedId: string;
  swapperUserId: string;
  swapperName: string;
  swapperImage: string | null;
  visitorName: string;
  visitorUserId: string;
  visitorImage: string | null;
  listedItem: string;
  swapperRequestItem: string;
  status: string;
  roomName: string | null;
  createdOn: string;
  lastActivity: string;
  isFlagged?: boolean;
}

export interface SwapProceedingResponse {
  statusCode: number;
  displayMessage: string;
  result: SwapProceedingItem;
  errorMessages: string[] | null;
}
