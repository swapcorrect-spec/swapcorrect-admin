import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import { Auth } from "~/config/auth";

const BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export const API = axios.create({
  baseURL: BASE_URL + "/api",
});

type RetryConfig = InternalAxiosRequestConfig & { _retry?: boolean };

let isRefreshing = false;
let refreshQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  refreshQueue.forEach(({ resolve, reject }) => {
    if (error || !token) {
      reject(error);
    } else {
      resolve(token);
    }
  });
  refreshQueue = [];
};

API.interceptors.request.use(
  (config: InternalAxiosRequestConfig<unknown>) => {
    const token = Auth.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (response) => {
    if (response.status === 208) {
      throw response;
    }
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryConfig | undefined;

    if (!originalRequest || error.response?.status !== 401) {
      return Promise.reject(error);
    }

    if (originalRequest.url?.includes("/auth/user/logout")) {
      return Promise.reject(error);
    }

    if (originalRequest.url?.includes("/auth/user/refresh-token")) {
      Auth.removeToken();
      return Promise.reject(error);
    }

    if (originalRequest._retry) {
      Auth.removeToken();
      return Promise.reject(error);
    }

    const refreshToken = Auth.getRefreshToken();
    if (!refreshToken) {
      Auth.removeToken();
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        refreshQueue.push({
          resolve: (token: string) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(API(originalRequest));
          },
          reject,
        });
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const response = await axios.post(
        `${BASE_URL}/api/auth/user/refresh-token`,
        { refreshToken },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      const newAccessToken = response?.data?.result?.jwt as string | undefined;
      const newRefreshToken = response?.data?.result?.refreshToken as
        | string
        | undefined;

      if (!newAccessToken) {
        throw new Error("No access token returned from refresh");
      }

      Auth.setAuthTokens(newAccessToken, newRefreshToken);
      processQueue(null, newAccessToken);
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return API(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError, null);
      Auth.removeToken();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);
