import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosInstance } from "axios";
import { API_URL } from "../config/env";
import { ApiResponse } from "../types";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 20000,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("userToken");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => error.response.data
);

export const post = async <T>(
  uri: string,
  body: any,
  customHeaders?: Record<string, any>
) => {
  return await fetch<T>(uri, "POST", body, customHeaders);
};

export const get = async <T>(
  uri: string,
  params?: Record<string, any>,
  customHeaders?: Record<string, any>
) => {
  const url = uri + new URLSearchParams(params).toString();
  console.log("url", url);
  return await fetch<T>(url, "GET", null, customHeaders);
};

const fetch = async <T>(
  uri: string,
  method: string,
  body?: any,
  customHeaders: Record<string, any> = {}
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
