import { GET_PLAYERS_URI } from "../constants/api";
import { get } from "./api";

export const getPlayers = async (name: string) => {
  return await get<any[]>(GET_PLAYERS_URI, {
    queryParams: { name },
    withCache: true,
  });
};
