import { Player } from "../player/Player";

export type Application = {
  id: number;
  matchId: number;
  playerId: string;
  teamNumber: 1 | 2 | null;
  message: string | null;
  phone: string | null;
  reason: string | null;
  createdAt: string;
  status: string;
  player: Player;
};
