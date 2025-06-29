import { Player } from "../player/Player";

export type Application = {
  id: number;
  matchId: number;
  playerId: string;
  teamNumber: number;
  message: string | null;
  phone: string | null;
  reason: string | null;
  createdAt: string;
  status: string;
  player: Player;
};
