import { useQuery } from "@tanstack/react-query";
import { getRequestParams } from "~/config/request-methods";
import type { UsersResponse } from "./user.type";

export const USERS = "USERS";

export const useGetUsers = (props: {
  enabler: boolean;
  pageNumber?: number;
  pageSize?: number;
  search?: string;
  sortBy?: string;
  sortDesc?: boolean;
  filterType?: "All" | "Active" | "Suspended" | "Flagged" | "NewSignups";
  days?: number;
}) => {
  const {
    enabler = true,
    pageNumber = 1,
    pageSize = 20,
    search,
    sortBy,
    sortDesc,
    filterType = "All",
    days = 30,
  } = props;

  const { data, isError, isSuccess, isLoading, isFetching, error } = useQuery({
    queryKey: [USERS, pageNumber, pageSize, search, sortBy, sortDesc, filterType, days],
    queryFn: async ({ signal }) =>
      getRequestParams<
        {
          PageNumber: number;
          PageSize: number;
          Search?: string;
          SortBy?: string;
          SortDesc?: boolean;
          filterType: string;
          days: number;
        },
        UsersResponse
      >({
        url: "/Admin/users",
        params: {
          PageNumber: pageNumber,
          PageSize: pageSize,
          Search: search,
          SortBy: sortBy,
          SortDesc: sortDesc,
          filterType,
          days,
        },
        config: { signal },
      }),
    enabled: !!enabler,
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    data: data?.result,
    isLoading,
    isFetching,
    isError,
    error,
    isSuccess,
  };
};

