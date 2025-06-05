import { DELETE_MATCH_URI, GET_MY_MATCHES_URI } from "../constants/api";
import { Match } from "../types";
import { deleteApi, get } from "./api";

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

export const deleteMatchApi = async (matchId: number) => {
  return await deleteApi<Match>(`${DELETE_MATCH_URI}/${matchId.toString()}`);
};
