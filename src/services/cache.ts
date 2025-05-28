import { ApiResponse } from "../types";

export const cache = new Map<
  string,
  { timestamp: number; data: ApiResponse<any> }
>();
export const CACHE_TTL = 5 * 60 * 1000;

export const invalidateCache = (uri: string, params?: Record<string, any>) => {
  const url = params ? `${uri}?${new URLSearchParams(params).toString()}` : uri;
  cache.delete(url);
};

export const clearCache = () => {
  cache.clear();
};
