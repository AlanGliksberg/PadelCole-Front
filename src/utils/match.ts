import { MatchResult, Match, Player } from "../types";

export const parseSets = (match: Match | null): MatchResult | null => {
  if (!match || match.sets.length === 0) return null;

  const set1 = match.sets.find((s) => s.setNumber === 1);
  const set2 = match.sets.find((s) => s.setNumber === 2);
  const set3 = match.sets.find((s) => s.setNumber === 3);
  return {
    team1Set1: set1?.team1Score?.toString(),
    team2Set1: set1?.team2Score?.toString(),
    team1Set2: set2?.team1Score?.toString(),
    team2Set2: set2?.team2Score?.toString(),
    team1Set3: set3?.team1Score?.toString(),
    team2Set3: set3?.team2Score?.toString(),
  };
};

export const matchResultIsValid = (result: MatchResult) => {
  // TODO - validar mejor el resultado
  if (!result.team1Set1 || !result.team2Set1) {
    return false;
  }
  return true;
};

export const matchIsFriendly = (
  match: Match | null,
  team1?: Player[],
  team2?: Player[]
) => {
  return match
    ? !match?.teams.every((t) => t.players.some((p) => p.userId))
    : (team1 && team1.every((p) => !p.userId)) ||
        (team2 && team2!.every((p) => !p.userId));
};
