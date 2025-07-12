import { Player } from "../player/Player";
import { ApplicationStatus } from "./Status";

export type Application = {
  id: number;
  matchId: number;
  playerId: number;
  teamNumber: 1 | 2 | null;
  message: string | null;
  phone: string | null;
  reason: string | null;
  createdAt: string;
  status: ApplicationStatus;
  player: Player;
};
