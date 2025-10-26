import { useMutation, useQuery } from "@tanstack/react-query";
import type { LoginPayload, ILoginResponse, ForgotPasswordPayload, IFogotPasswordResponse,  ResetPasswordPayload, IResetPasswordResponse, IGetUserInfoResponseData, IGetGeneralUserInfoResponseData } from "./auth.type";
import type { } from "./auth.type";
import handleApiError from "~/utils/handle-api-error";
import { postRequest, getRequest, getRequestParams } from "~/config/request-methods";
import type { MutationProps } from "~/types/mutation-prop-types";

export const useLogin = (props: MutationProps) => {
  const { onSuccess, onError } = props;
  const { mutate, isError, isSuccess, isPending } = useMutation({
    mutationFn: ({ payload }: LoginPayload) =>
      postRequest<LoginPayload["payload"], ILoginResponse>({
        url: "/auth/user/login",
        payload,
      }),
    onSuccess(values) {
      onSuccess(values);
    },
    onError(err) {
      const msgError = handleApiError(err);
      if (onError) {
        onError(msgError, err);
      }
    },
  });

  return {
    mutate,
    isError,
    isSuccess,
    isPending,
  };
};


export const useForgotPassword = (props: MutationProps) => {
  const { onSuccess, onError } = props;
  const { mutate, isError, isSuccess, isPending } = useMutation({
    mutationFn: ({ payload }: ForgotPasswordPayload) =>
      postRequest<ForgotPasswordPayload["payload"], IFogotPasswordResponse>({
        url: "/auth/user/forget_password",
        payload,
      }),
    onSuccess(values) {
      onSuccess(values);
    },
    onError(err) {
      const msgError = handleApiError(err);
      if (onError) {
        onError(msgError, err);
      }
    },
  });

  return {
    mutate,
    isError,
    isSuccess,
    isPending,
  };
};

export const useResetPassword = (props: MutationProps) => {
  const { onSuccess, onError } = props;
  const { mutate, isError, isSuccess, isPending } = useMutation({
    mutationFn: ({ payload }: ResetPasswordPayload) =>
      postRequest<ResetPasswordPayload["payload"], IResetPasswordResponse>({
        url: "/auth/user/reset_password",
        payload,
      }),
    onSuccess(values) {
      onSuccess(values);
    },
    onError(err) {
      const msgError = handleApiError(err);
      if (onError) {
        onError(msgError, err);
      }
    },
  });

  return {
    mutate,
    isError,
    isSuccess,
    isPending,
  };
};

export const useGetUserInfo = (props: { enabler: boolean }) => {
  const { enabler } = props;
  const { data, isError, isSuccess, isLoading, isFetching, error } = useQuery({
    queryKey: ["useGetUserInfo"],
    queryFn: () =>
      getRequest<IGetUserInfoResponseData>({
        url: "/auth/user/info",
      }),
    enabled: !!enabler,
  });

  return {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    isSuccess,
  };
};

export const useGetGeneralUserInfo = (props: { userId: string; enabler: boolean }) => {
  const { userId, enabler } = props;
  const { data, isError, isSuccess, isLoading, isFetching, error } = useQuery({
    queryKey: ["useGetGeneralUserInfo", userId],
    queryFn: () =>
      getRequestParams<{}, IGetGeneralUserInfoResponseData>({
        url: "/auth/general/user/info",
        params: { userId },
      }),
    enabled: !!enabler && !!userId,
  });

  return {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    isSuccess,
  };
};
