import { useMutation, useQuery } from "@tanstack/react-query";
import type {
  LoginPayload,
  ILoginResponse,
  ForgotPasswordPayload,
  IFogotPasswordResponse,
  ResetPasswordPayload,
  IResetPasswordResponse,
  ChangeSignedInPasswordPayload,
  IChangeSignedInPasswordResponse,
  IGetUserInfoResponseData,
  IGetGeneralUserInfoResponseData,
} from "./auth.type";
import handleApiError from "~/utils/handle-api-error";
import { postRequest, getRequest, getRequestParams, putRequest } from "~/config/request-methods";
import type { MutationProps } from "~/types/mutation-prop-types";

export const GENERAL_USER_INFO = "GENERAL_USER_INFO";

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

export const useChangeSignedInPassword = (props: MutationProps) => {
  const { onSuccess, onError } = props;
  const { mutate, isError, isSuccess, isPending } = useMutation({
    mutationFn: ({ payload }: ChangeSignedInPasswordPayload) =>
      putRequest<
        ChangeSignedInPasswordPayload["payload"],
        IChangeSignedInPasswordResponse
      >({
        url: "/auth/user/reset_password_signedIn_user",
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

export const USER_INFO = "USER_INFO";

export const useGetUserInfo = (props: { enabler: boolean }) => {
  const { enabler } = props;
  const { data, isError, isSuccess, isLoading, isFetching, error, refetch } =
    useQuery({
      queryKey: [USER_INFO],
      queryFn: () =>
        getRequest<IGetUserInfoResponseData>({
          url: "/auth/user/info",
        }),
      enabled: !!enabler,
      staleTime: 5 * 60 * 1000,
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

export const useGetGeneralUserInfo = (props: { userId: string; enabler: boolean }) => {
  const { userId, enabler } = props;
  const { data, isError, isSuccess, isLoading, isFetching, error, refetch } =
    useQuery({
    queryKey: [GENERAL_USER_INFO, userId],
    queryFn: () =>
      getRequestParams<{ userId: string }, IGetGeneralUserInfoResponseData>({
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
    refetch,
  };
};
