import type { AxiosRequestConfig } from 'axios';

import { API } from './axios';

type ApiObjType = Record<
  string,
  | string
  | boolean
  | undefined
  | null
  | string[]
  | number[]
  | number
  | Date
  | Date[]
>;

interface FuncProp<T> {
  url: string;
  payload: T;
  config?: AxiosRequestConfig;
}

interface GetFuncProp<T extends ApiObjType> {
  url: string;
  params: T | undefined;
  config?: AxiosRequestConfig;
}

export const postRequest = async <T, R>({
  url,
  payload,
  config,
}: FuncProp<T>) => {
  const { data } = await API.post<R>(url, payload, config);

  return data;
};

export const putRequest = async <T, R>({
  url,
  payload,
  config,
}: FuncProp<T>) => {
  const { data } = await API.put<R>(url, payload, config);

  return data;
};

export const patchRequest = async <T, R>({
  url,
  payload,
  config,
}: FuncProp<T>) => {
  const { data } = await API.patch<R>(url, payload, config);

  return data;
};

export const deleteRequest = async <R>({ url }: { url: string }) => {
  const { data } = await API.delete<R>(url);

  return data;
};

export const getRequestParams = async <T extends ApiObjType, R>({
  url,
  params,
  config,
}: GetFuncProp<T>) => {
  const { data } = await API.get<R>(url, { ...config, params });

  return data;
};

export const getRequest = async <R>({ url }: { url: string }) => {
  const { data } = await API.get<R>(url);

  return data;
};
