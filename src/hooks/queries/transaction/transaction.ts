import { useQuery } from "@tanstack/react-query";
import { getRequestParams } from "~/config/request-methods";
import type {
  TransactionDateFilter,
  TransactionsResponse,
} from "./transaction.type";

export const TRANSACTIONS = "TRANSACTIONS";

export const useGetTransactions = (props: {
  enabler: boolean;
  userId?: string;
  searchParam?: string;
  dateFilter?: TransactionDateFilter;
  pageNumber?: number;
  pageSize?: number;
}) => {
  const {
    enabler = true,
    userId,
    searchParam,
    dateFilter = "All",
    pageNumber = 1,
    pageSize = 20,
  } = props;

  const { data, isError, isSuccess, isLoading, isFetching, error, refetch } =
    useQuery({
      queryKey: [
        TRANSACTIONS,
        userId,
        searchParam,
        dateFilter,
        pageNumber,
        pageSize,
      ],
      queryFn: async ({ signal }) =>
        getRequestParams<
          {
            UserId?: string;
            SearchParam?: string;
            DateFilter?: TransactionDateFilter;
            PageNumber: number;
            PageSize: number;
          },
          TransactionsResponse
        >({
          url: "/Admin/transactions",
          params: {
            UserId: userId?.trim() || undefined,
            SearchParam: searchParam?.trim() || undefined,
            DateFilter: dateFilter === "All" ? undefined : dateFilter,
            PageNumber: pageNumber,
            PageSize: pageSize,
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
