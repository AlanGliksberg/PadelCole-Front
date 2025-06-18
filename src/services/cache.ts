import { GET_MY_MATCHES_URI } from "../constants/api";
import { ApiResponse } from "../types";

interface CacheEntry {
  timestamp: number;
  data: ApiResponse<any>;
}

export const cache = new Map<string, Map<string, CacheEntry>>();
export const CACHE_TTL = 5 * 60 * 1000;

const removeCache = (uri: string) => {
  cache.delete(uri);
};

export const clearCache = () => {
  cache.clear();
};

export const getCachedCall = (uri: string, url: string) => {
  const cachedUri = cache.get(uri);
  if (!cachedUri) return null;
  const cached = cachedUri.get(url);
  return cached;
};

export const cacheGetCall = (
  uri: string,
  url: string,
  result: ApiResponse<any>
) => {
  const cachedUri = cache.get(uri);
  if (cachedUri) {
    cachedUri.set(url, { timestamp: Date.now(), data: result });
    return;
  }
  const valueDictionary = new Map<string, CacheEntry>();
  valueDictionary.set(url, { timestamp: Date.now(), data: result });
  cache.set(uri, valueDictionary);
};

export const removeGetCreatedMatchesCache = () => {
  removeCache(GET_MY_MATCHES_URI);
};
