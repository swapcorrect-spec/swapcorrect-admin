import { useQuery } from "@tanstack/react-query";
import { getRequestParams } from "~/config/request-methods";
import type {
  AdminSwapActivityResponse,
  SwapActivityFilter,
  SwapChatHistoryMessage,
  SwapChatHistoryResponse,
  SwapProceedingResponse,
  SwapSearchResponseInterface,
} from "./swap-activity.type";

export const SWAP_ACTIVITY = "SWAP_ACTIVITY";
export const SWAP_PROCEEDING = "SWAP_PROCEEDING";
export const SWAP_CHAT_HISTORY = "SWAP_CHAT_HISTORY";

const getValue = (
  record: Record<string, unknown>,
  keys: string[],
): unknown => {
  for (const key of keys) {
    const match = Object.entries(record).find(
      ([recordKey]) => recordKey.toLowerCase() === key.toLowerCase(),
    );
    if (match) return match[1];
  }
  return undefined;
};

const getStringValue = (
  record: Record<string, unknown>,
  keys: string[],
): string => {
  const value = getValue(record, keys);
  if (typeof value === "string") return value.trim();
  if (typeof value === "number") return String(value);
  return "";
};

const getArrayFromUnknown = (value: unknown): unknown[] => {
  if (Array.isArray(value)) return value;
  if (!value || typeof value !== "object") return [];

  const record = value as Record<string, unknown>;
  const nested = getValue(record, [
    "items",
    "messages",
    "chatHistory",
    "data",
    "result",
  ]);

  return Array.isArray(nested) ? nested : [];
};

export const normalizeSwapChatHistory = (
  value: unknown,
): SwapChatHistoryMessage[] => {
  const messages = getArrayFromUnknown(value)
    .map<SwapChatHistoryMessage | null>((entry, index) => {
      if (!entry || typeof entry !== "object") return null;

      const record = entry as Record<string, unknown>;
      const message = getStringValue(record, [
        "message",
        "content",
        "text",
        "body",
      ]);

      if (!message) return null;

      return {
        id:
          getStringValue(record, ["id", "messageId", "chatId"]) ||
          `msg-${index}`,
        senderName:
          getStringValue(record, [
            "senderName",
            "fromUserName",
            "userName",
            "name",
            "sender",
          ]) || "Unknown sender",
        message,
        createdAt: getStringValue(record, [
          "createdAt",
          "sentAt",
          "timeStamp",
          "timestamp",
          "createdOn",
          "date",
        ]),
        senderId: getStringValue(record, ["senderId", "fromUserId", "userId"]),
        receiverId: getStringValue(record, [
          "receiverId",
          "toUserId",
          "recipientId",
        ]),
      };
    })
    .filter((item): item is SwapChatHistoryMessage => item !== null);

  return messages;
};

export const useGetAdminSwapActivity = (props: {
  enabler: boolean;
  pageNumber?: number;
  pageSize?: number;
  filter?: SwapActivityFilter;
}) => {
  const {
    enabler,
    pageNumber = 1,
    pageSize = 20,
    filter = "AllTime",
  } = props;

  const { data, isError, isSuccess, isLoading, isFetching, error, refetch } =
    useQuery({
      queryKey: [SWAP_ACTIVITY, pageNumber, pageSize, filter],
      queryFn: async ({ signal }) =>
        getRequestParams<
          {
            pageNumber: number;
            pageSize: number;
            filter: SwapActivityFilter;
          },
          AdminSwapActivityResponse
        >({
          url: "/Admin/swaps-activity",
          params: {
            pageNumber,
            pageSize,
            filter,
          },
          config: { signal },
        }),
      enabled: !!enabler,
      staleTime: 2 * 60 * 1000,
      gcTime: 5 * 60 * 1000,
    });

  return {
    data: data?.result,
    isLoading,
    isFetching,
    isError,
    error,
    isSuccess,
    refetch,
  };
};

export interface UseSearchSwapsProps {
  enabler: boolean;
  listingUserId?: string;
  searhParam?: string;
  swapListingStatus?: "Published" | "Negotiation" | "Swapped" | "All";
  listingDate?: "All" | "LastWeek" | "LastMonth";
  pageNumber?: number;
  perpageSize?: number;
}

export const useSearchSwaps = (props: UseSearchSwapsProps) => {
  const {
    enabler,
    listingUserId,
    searhParam,
    swapListingStatus,
    listingDate,
    pageNumber = 1,
    perpageSize = 20,
  } = props;

  const { data, isError, isSuccess, isLoading, isFetching, error, refetch } =
    useQuery({
    queryKey: [
      "useSearchSwaps",
      listingUserId,
      searhParam,
      swapListingStatus,
      listingDate,
      pageNumber,
      perpageSize,
    ],
    queryFn: async ({ signal }) =>
      getRequestParams<
        {
          listingUserId?: string;
          searhParam?: string;
          swapListingStatus?: string;
          listingDate?: string;
          pageNumber?: number;
          perpageSize?: number;
        },
        SwapSearchResponseInterface
      >({
        url: "/listing_item/paginated/search_swap",
        params: {
          listingUserId,
          searhParam,
          swapListingStatus,
          listingDate,
          pageNumber,
          perpageSize,
        },
        config: { signal },
      }),
    enabled: !!enabler,
  });

  return {
    data: data?.result,
    isLoading,
    isFetching,
    isError,
    error,
    isSuccess,
    refetch,
  };
};


export const useGetSwapProceeding = (props: {
  swapProceedId: string;
  enabler: boolean;
}) => {
  const { swapProceedId, enabler } = props;
  const { data, isError, isSuccess, isLoading, isFetching, error, refetch } =
    useQuery({
      queryKey: [SWAP_PROCEEDING, swapProceedId],
      queryFn: async ({ signal }) =>
        getRequestParams<
          { swapProceedId: string },
          SwapProceedingResponse
        >({
          url: "/listing_item/single-swap-proceeding",
          params: { swapProceedId },
          config: { signal },
        }),
      enabled: !!enabler && !!swapProceedId,
    });

  return {
    data: data?.result,
    isLoading,
    isFetching,
    isError,
    error,
    isSuccess,
    refetch,
  };
};

export const useGetSwapChatHistory = (props: {
  swapProceedId: string;
  enabler: boolean;
}) => {
  const { swapProceedId, enabler } = props;
  const { data, isError, isSuccess, isLoading, isFetching, error, refetch } =
    useQuery({
      queryKey: [SWAP_CHAT_HISTORY, swapProceedId],
      queryFn: async ({ signal }) =>
        getRequestParams<Record<string, never>, SwapChatHistoryResponse>({
          url: `/Admin/swaps-details-chathistory/${swapProceedId}`,
          params: {},
          config: { signal },
        }),
      enabled: !!enabler && !!swapProceedId,
    });

  return {
    data: normalizeSwapChatHistory(data?.result),
    isLoading,
    isFetching,
    isError,
    error,
    isSuccess,
    refetch,
  };
};