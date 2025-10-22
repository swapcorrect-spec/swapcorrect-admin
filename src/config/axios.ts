import axios, { type InternalAxiosRequestConfig } from "axios";

import { Auth } from "~/config/auth";

const BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export const API = axios.create({
  baseURL: BASE_URL + "/v1",
});

API.interceptors.request.use(
  (config: InternalAxiosRequestConfig<unknown>) => {
    if (Auth.isAuthenticated()) {
      config.headers["Authorization"] = `Bearer ${Auth.getToken()}`;
    }
    return config;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      Auth.removeToken(); // Call the logout function
    }
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => {
    if (response.status === 208) {
      throw response;
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error?.response?.status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true;
      const refreshToken = Auth.getRefreshToken();

      if (!Auth.getToken()) {
        Auth.removeToken(); // Call the logout function
        return Promise.reject(error);
      }

      originalRequest.headers["Authorization"] = `Bearer ${Auth.getToken()}`;

      try {
        const response = await axios.post(BASE_URL + "/v1" + "/auth/token/refresh/", {
          refresh: refreshToken,
        });

        if (response.status > 300) {
          Auth.removeToken(); // Call the logout function
          return Promise.reject(error);
        }
        const newToken = response?.data.access;
        Auth.setToken(newToken || "");
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return API(originalRequest);
      } catch (error) {
        Auth.removeToken(); // Call the logout function
        return Promise.reject(error);
      }
    }
    if (error?.response?.status === 401 && originalRequest?._retry) {
      Auth.removeToken(); // Call the logout function
      return Promise.reject(error);
    }
    if (error?.response?.status === 403) {
      Auth.removeToken(); // Call the logout function
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);
