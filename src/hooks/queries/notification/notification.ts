import { useInfiniteQuery } from "@tanstack/react-query";
import { getRequestParams } from "~/config/request-methods";
import type { NotificationsResponse } from "./notification.type";

export const NOTIFICATIONS = "NOTIFICATIONS";

const fetchNotifications = async ({
  userId,
  type,
  pageNumber,
  pageSize,
  signal,
}: {
  userId?: string;
  type?: string;
  pageNumber: number;
  pageSize: number;
  signal?: AbortSignal;
}) => {
  const response = await getRequestParams<
    {
      userId?: string;
      type?: string;
      pageNumber: number;
      pageSize: number;
    },
    NotificationsResponse
  >({
    url: "/Admin/notifications",
    params: {
      userId: userId?.trim() || undefined,
      type: type?.trim() || undefined,
      pageNumber,
      pageSize,
    },
    config: { signal },
  });

  console.log("[notifications]", { pageNumber, response });

  return response;
};

export const useGetNotifications = (props: {
  enabler: boolean;
  userId?: string;
  type?: string;
  pageSize?: number;
}) => {
  const { enabler = true, userId, type, pageSize = 20 } = props;

  const {
    data,
    isError,
    isSuccess,
    isLoading,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    error,
    refetch,
  } = useInfiniteQuery({
    queryKey: [NOTIFICATIONS, userId, type, pageSize],
    queryFn: ({ pageParam, signal }) =>
      fetchNotifications({
        userId,
        type,
        pageNumber: pageParam,
        pageSize,
        signal,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const result = lastPage?.result;
      if (!result) return undefined;

      const { pageNumber, totalPages } = result;
      if (pageNumber < totalPages) return pageNumber + 1;
      return undefined;
    },
    enabled: !!enabler,
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });

  const pages = data?.pages ?? [];
  const items = pages.flatMap((page) => page?.result?.items ?? []);
  const lastPage = pages[pages.length - 1]?.result;

  return {
    data: lastPage,
    pages,
    items,
    pageCount: pages.length,
    isLoading,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isError,
    error,
    isSuccess,
    refetch,
  };
};
