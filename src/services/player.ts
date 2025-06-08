import { GET_PLAYERS_URI } from "../constants/api";
import { Player } from "../types";
import { get } from "./api";

export const getPlayers = async (name: string | null) => {
  if (!name) return { error: false, data: { players: [] } };
  return await get<{ players: Player[] }>(GET_PLAYERS_URI, {
    queryParams: { name },
    withCache: true,
  });
};
