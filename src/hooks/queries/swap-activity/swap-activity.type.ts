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
}

export interface SwapProceedingResponse {
  statusCode: number;
  displayMessage: string;
  result: SwapProceedingItem;
  errorMessages: string[] | null;
}
