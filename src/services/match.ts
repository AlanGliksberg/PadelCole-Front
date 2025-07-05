import {
  ADD_PLAYER_TO_MATCH_URI,
  CREATE_MATCH_URI,
  DELETE_MATCH_URI,
  GET_MATCHES_COUNT_URI,
  GET_MY_MATCHES_URI,
  REMOVE_PLAYER_FROM_MATCH_URI,
  UPDATE_MATCH_URI,
} from "../constants/api";
import { CreateMatchBody, GetCreatedMatchesResponse } from "../types";
import { CommonMatchResponse, UpdateMatchBody } from "../types/api/Match";
import { deleteApi, get, post, put } from "./api";

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

export const removePlayerFromMatch = async (
  matchId: number,
  teamNumber: number,
  playerId: number
) => {
  return await deleteApi<CommonMatchResponse>(
    `${REMOVE_PLAYER_FROM_MATCH_URI}/${matchId.toString()}/${teamNumber.toString()}/${playerId.toString()}`
  );
};

export const createMatch = async (data: CreateMatchBody) => {
  return await post<CommonMatchResponse>(CREATE_MATCH_URI, {
    body: data,
  });
};

export const updateMatch = async (matchId: number, data: UpdateMatchBody) => {
  return await put<CommonMatchResponse>(
    `${UPDATE_MATCH_URI}/${matchId.toString()}`,
    {
      body: data,
    }
  );
};

export const deletePlayerFromMatch = async (
  matchId: number,
  playerId: number
) => {
  return await deleteApi<CommonMatchResponse>(ADD_PLAYER_TO_MATCH_URI, {
    body: { matchId, playerId },
  });
};

export const getMatchesCount = async () => {
  return await get<{ count: number }>(GET_MATCHES_COUNT_URI, {
    withCache: true,
  });
};
