import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosInstance } from "axios";
import { API_URL } from "../config/env";
import { USER_TOKEN_SESSION_KEY } from "../constants/auth";
import { ApiParams, ApiResponse } from "../types";
import { cache, CACHE_TTL } from "./cache";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 20000,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem(USER_TOKEN_SESSION_KEY);
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (!error?.response?.data) throw error;
    return error.response.data;
  }
);

export const post = async <T>(uri: string, apiParams: ApiParams) => {
  apiParams.method = "POST";
  return await fetch<T>(uri, apiParams);
};

export const get = async <T>(uri: string, apiParams: ApiParams = {}) => {
  const url = apiParams?.queryParams
    ? `${uri}?${new URLSearchParams(apiParams.queryParams).toString()}`
    : uri;

  if (apiParams.withCache) {
    const cached = cache.get(url);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return cached.data;
    }
  }

  apiParams.method = "GET";
  const result = await fetch<T>(url, apiParams);

  cache.set(url, { timestamp: Date.now(), data: result });

  return result;
};

const fetch = async <T>(
  uri: string,
  { method, body, customHeaders = {} }: ApiParams
): Promise<ApiResponse<T>> => {
  const headers = getHeaders(customHeaders);
  try {
    switch (method) {
      case "POST":
      default:
        return await axiosInstance.post<never, ApiResponse<T>>(uri, body, {
          headers,
        });
      case "GET":
        return await axiosInstance.get<never, ApiResponse<T>>(uri, {
          headers,
        });
    }
  } catch (e) {
    console.log("Error:", e);
    return { error: true };
  }
};

const getHeaders = (customHeaders: Record<string, any>) => {
  return {
    "Content-Type": "application/json",
    ...customHeaders,
  };
};
