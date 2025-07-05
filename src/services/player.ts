import {
  CREATE_PLAYER_URI,
  GET_CATEGORIES_URI,
  GET_CURRENT_PLAYER_URI,
  GET_GENDERS_URI,
  GET_PLAYERS_URI,
  GET_POSITIONS_URI,
  GET_QUESTIONS_URI,
  UPDATE_PLAYER_URI,
} from "../constants/api";
import { Category, Gender, GetPlayerParams, Player, Position } from "../types";
import { CreatePlayerPayload, UpdatePlayerPayload } from "../types/api/Player";
import { Question } from "../types/player/Question";
import { get, post, put } from "./api";

export const getAllPlayers = async () => {
  return await get<{ players: Player[] }>(GET_PLAYERS_URI, {
    withCache: true,
  });
};

export const getPlayers = async (params: GetPlayerParams) => {
  // Si se está buscando por ID (cuando el nombre es un número), permitir la búsqueda sin filtros
  const isSearchingById = !isNaN(Number(params.name)) && params.name !== "";

  if (
    !isSearchingById && // No aplicar restricción si se busca por ID
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

export const updatePlayer = async (data: UpdatePlayerPayload) => {
  return await put<{ player: Player }>(UPDATE_PLAYER_URI, {
    body: data,
  });
};

export const getCurrentPlayer = async () => {
  return await get<{ player: Player }>(GET_CURRENT_PLAYER_URI, {
    withCache: true,
  });
};
