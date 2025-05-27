import { Player } from "./Player";

export type Team = {
  id: string;
  matchId: string;
  teamNumber: 1 | 2;
  players: Player[];
};
