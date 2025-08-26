import {
  ADD_PLAYER_TO_MATCH_URI,
  CREATE_MATCH_URI,
  DELETE_MATCH_URI,
  GET_PLAYED_MATCHES_COUNT_URI,
  REMOVE_PLAYER_FROM_MATCH_URI,
  UPDATE_MATCH_URI,
  GET_CREATED_MATCHES_URI,
  GET_PLAYED_MATCHES_URI,
  GET_APPLIED_MATCHES_URI,
  GET_MATCHES_URI,
} from "../constants/api";
import {
  CreateMatchBody,
  GetMatchesResponse,
  MatchFilters,
  Player,
} from "../types";
import { CommonMatchResponse, UpdateMatchBody } from "../types/api/Match";
import { deleteApi, get, post, put } from "./api";

export const getCreatedMatches = async (
  page: number,
  pageSize: number,
  withCache = false
) => {
  if (typeof page !== "number" || isNaN(page)) {
    page = 1;
  }
  return await get<GetMatchesResponse>(GET_CREATED_MATCHES_URI, {
    queryParams: { page, pageSize },
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
  player: Player
) => {
  return await post<CommonMatchResponse>(ADD_PLAYER_TO_MATCH_URI, {
    body: {
      matchId,
      teamNumber,
      playerId: player.id,
      firstName: player.firstName,
      lastName: player.lastName,
      genderId: player.genderId,
      categoryId: player.categoryId,
      phone: player.phone,
    },
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

export const getPlayedMatchesCount = async () => {
  return await get<{ count: number }>(GET_PLAYED_MATCHES_COUNT_URI, {
    withCache: true,
  });
};

export const getPlayedMatches = async (
  page: number,
  pageSize: number,
  withCache = true
) => {
  if (typeof page !== "number" || isNaN(page)) {
    page = 1;
  }
  return await get<GetMatchesResponse>(GET_PLAYED_MATCHES_URI, {
    queryParams: { page, pageSize },
    withCache,
  });
};

export const getAppliedMatches = async (
  page: number,
  pageSize: number,
  withCache = true
) => {
  if (isNaN(page)) {
    page = 1;
  }
  return await get<GetMatchesResponse>(GET_APPLIED_MATCHES_URI, {
    queryParams: { page, pageSize },
    withCache,
  });
};

export const getMatchesWithFilters = async (
  page: number,
  pageSize: number,
  filters: MatchFilters,
  withCache = true
) => {
  if (typeof page !== "number" || isNaN(page)) {
    page = 1;
  }
  return await get<GetMatchesResponse>(GET_MATCHES_URI, {
    queryParams: { page, pageSize, ...filters },
    withCache,
  });
};
