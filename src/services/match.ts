import { GET_MY_MATCHES_URI } from "../constants/api";
import { get } from "./api";

export const getCreatedMatches = async <T>(
  page: number,
  pageSize: number,
  withCache = true
) => {
  return await get<T>(GET_MY_MATCHES_URI, {
    queryParams: { page, pageSize, createdBy: true },
    withCache,
  });
};
