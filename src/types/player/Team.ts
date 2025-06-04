import { Player } from "./Player";

export type Team = {
  id: number;
  matchId: number;
  teamNumber: 1 | 2;
  players: Player[];
};
