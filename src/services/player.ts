import {
  CREATE_PLAYER_URI,
  GET_CATEGORIES_URI,
  GET_GENDERS_URI,
  GET_PLAYERS_URI,
  GET_POSITIONS_URI,
  GET_QUESTIONS_URI,
} from "../constants/api";
import { Category, Gender, GetPlayerParams, Player, Position } from "../types";
import { CreatePlayerPayload } from "../types/api/Player";
import { Question } from "../types/player/Question";
import { get, post } from "./api";

export const getPlayers = async (params: GetPlayerParams) => {
  if (
    !params.name &&
    !params.category?.some(Boolean) &&
    !params.gender?.some(Boolean) &&
    !params.position?.some(Boolean)
  )
    return { error: false, data: { players: [] } };

  return await get<{ players: Player[] }>(GET_PLAYERS_URI, {
    queryParams: params,
    withCache: true,
  });
};

export const getGenders = async (filterBoth: boolean = false) => {
  const res = await get<{ genders: Gender[] }>(GET_GENDERS_URI, {
    withCache: true,
    queryParams: { filterBoth },
  });

  if (res.error || !res.data) throw new Error(res.message);

  return res;
};

export const getPositions = async () => {
  return await get<{ positions: Position[] }>(GET_POSITIONS_URI, {
    withCache: true,
  });
};

export const getCategories = async (filterBoth: boolean) => {
  return await get<{ categories: Category[] }>(GET_CATEGORIES_URI, {
    withCache: true,
    queryParams: { filterBoth },
  });
};

export const getQuestions = async () => {
  return await get<{ questions: Question[] }>(GET_QUESTIONS_URI, {
    withCache: true,
  });
};

export const createPlayer = async (data: CreatePlayerPayload) => {
  return await post<{ player: Player }>(CREATE_PLAYER_URI, {
    body: data,
  });
};
