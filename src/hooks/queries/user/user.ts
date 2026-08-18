import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GENERAL_USER_INFO } from "~/hooks/queries/auth/auth";
import { getRequestParams, postRequest } from "~/config/request-methods";
import type { MutationProps } from "~/types/mutation-prop-types";
import handleApiError from "~/utils/handle-api-error";
import type {
  SuspendUserPayload,
  SuspendUserResponse,
  UserFilterType,
  UserStatsResponse,
  UsersResponse,
} from "./user.type";

export const USERS = "USERS";
export const USER_STATS = "USER_STATS";

export const useGetUsers = (props: {
  enabler: boolean;
  pageNumber?: number;
  pageSize?: number;
  search?: string;
  sortBy?: string;
  sortDesc?: boolean;
  filterType?: UserFilterType;
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

  const { data, isError, isSuccess, isLoading, isFetching, error, refetch } =
    useQuery({
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
          Search: search?.trim() || undefined,
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
    refetch,
  };
};

export const useGetUserStats = (props: { enabler?: boolean } = {}) => {
  const { enabler = true } = props;

  const { data, isError, isSuccess, isLoading, isFetching, error, refetch } =
    useQuery({
      queryKey: [USER_STATS],
      queryFn: async ({ signal }) =>
        getRequestParams<Record<string, never>, UserStatsResponse>({
          url: "/Admin/user-stats",
          params: undefined,
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

export const useSuspendUser = (props: MutationProps) => {
  const { onSuccess, onError } = props;
  const queryClient = useQueryClient();

  const { mutate, isError, isSuccess, isPending } = useMutation({
    mutationFn: (payload: SuspendUserPayload) =>
      postRequest<SuspendUserPayload, SuspendUserResponse>({
        url: "/Admin/Admin/suspend-user",
        payload,
      }),
    onSuccess(values) {
      queryClient.invalidateQueries({ queryKey: [USERS] });
      queryClient.invalidateQueries({ queryKey: [USER_STATS] });
      queryClient.invalidateQueries({ queryKey: [GENERAL_USER_INFO] });
      onSuccess(values);
    },
    onError(err) {
      const msgError = handleApiError(err);
      onError?.(msgError, err);
    },
  });

  return { mutate, isError, isSuccess, isPending };
};

export const useUnsuspendUser = (props: MutationProps) => {
  const { onSuccess, onError } = props;
  const queryClient = useQueryClient();

  const { mutate, isError, isSuccess, isPending } = useMutation({
    mutationFn: (payload: SuspendUserPayload) =>
      postRequest<SuspendUserPayload, SuspendUserResponse>({
        url: "/Admin/Admin/unsuspend-user",
        payload,
      }),
    onSuccess(values) {
      queryClient.invalidateQueries({ queryKey: [USERS] });
      queryClient.invalidateQueries({ queryKey: [USER_STATS] });
      queryClient.invalidateQueries({ queryKey: [GENERAL_USER_INFO] });
      onSuccess(values);
    },
    onError(err) {
      const msgError = handleApiError(err);
      onError?.(msgError, err);
    },
  });

  return { mutate, isError, isSuccess, isPending };
};

