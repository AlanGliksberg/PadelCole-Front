import {
  GET_CATEGORIES_URI,
  GET_GENDERS_URI,
  GET_PLAYERS_URI,
  GET_POSITIONS_URI,
} from "../constants/api";
import { Category, Gender, GetPlayerParams, Player, Position } from "../types";
import { get } from "./api";

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

export const getCategories = async (filterBoth: boolean = false) => {
  return await get<{ categories: Category[] }>(GET_CATEGORIES_URI, {
    withCache: true,
    queryParams: { filterBoth },
  });
};
