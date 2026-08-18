import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getRequestParams, putRequest } from "~/config/request-methods";
import type { MutationProps } from "~/types/mutation-prop-types";
import handleApiError from "~/utils/handle-api-error";
import type {
  TreatWithdrawalPayload,
  TreatWithdrawalResponse,
  WithdrawalStatus,
  WithdrawalsResponse,
} from "./withdrawal.type";

export const WITHDRAWALS = "WITHDRAWALS";

export const useGetWithdrawals = (props: {
  enabler: boolean;
  userId?: string;
  status?: WithdrawalStatus;
  pageNumber?: number;
  pageSize?: number;
}) => {
  const {
    enabler = true,
    userId,
    status = "All",
    pageNumber = 1,
    pageSize = 20,
  } = props;

  const { data, isError, isSuccess, isLoading, isFetching, error, refetch } =
    useQuery({
      queryKey: [WITHDRAWALS, userId, status, pageNumber, pageSize],
      queryFn: async ({ signal }) =>
        getRequestParams<
          {
            UserId?: string;
            Status?: WithdrawalStatus;
            PageNumber: number;
            PageSize: number;
          },
          WithdrawalsResponse
        >({
          url: "/Admin/withdrawals",
          params: {
            UserId: userId?.trim() || undefined,
            Status: status === "All" ? undefined : status,
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

export const useTreatWithdrawal = (props: MutationProps) => {
  const { onSuccess, onError } = props;
  const queryClient = useQueryClient();

  const { mutate, isError, isSuccess, isPending } = useMutation({
    mutationFn: (payload: TreatWithdrawalPayload) =>
      putRequest<TreatWithdrawalPayload, TreatWithdrawalResponse>({
        url: "/Admin/withdrawal/treat",
        payload,
      }),
    onSuccess(values) {
      queryClient.invalidateQueries({ queryKey: [WITHDRAWALS] });
      onSuccess(values);
    },
    onError(err) {
      const msgError = handleApiError(err);
      onError?.(msgError, err);
    },
  });

  return {
    mutate,
    isError,
    isSuccess,
    isPending,
  };
};
