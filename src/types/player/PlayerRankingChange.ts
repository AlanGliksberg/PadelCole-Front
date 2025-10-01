export type PlayerRankingChange = {
  id: number;
  matchId: number;
  playerId: number;
  isWinner: boolean;
  oldPoints: number;
  deltaPoints: number;
  newPoints: number;
  createdAt: string;
};
