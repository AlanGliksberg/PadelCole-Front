import {
  ADD_PLAYER_TO_MATCH_URI,
  CREATE_MATCH_URI,
  DELETE_MATCH_URI,
  GET_MY_MATCHES_URI,
} from "../constants/api";
import { CreateMatchBody, GetCreatedMatchesResponse } from "../types";
import { CommonMatchResponse } from "../types/api/Match";
import { deleteApi, get, post } from "./api";

export const getCreatedMatches = async (
  page: number,
  pageSize: number,
  withCache = true
) => {
  return await get<GetCreatedMatchesResponse>(GET_MY_MATCHES_URI, {
    queryParams: { page, pageSize, createdBy: true },
    withCache,
  });
};

export const deleteMatchApi = async (matchId: number) => {
  return await deleteApi<CommonMatchResponse>(
    `${DELETE_MATCH_URI}/${matchId.toString()}`
  );
};

export const addPlayerToMatch = async (
  matchId: number,
  teamNumber: number,
  playerId: number
) => {
  return await post<CommonMatchResponse>(ADD_PLAYER_TO_MATCH_URI, {
    body: { matchId, teamNumber, playerId },
  });
};

export const createMatch = async (data: CreateMatchBody) => {
  return await post<CommonMatchResponse>(CREATE_MATCH_URI, {
    body: data,
  });
};
