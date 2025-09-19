import { MatchResult, Match } from "../types";

export const parseSets = (match: Match | null): MatchResult | null => {
  if (!match || match.sets.length === 0) return null;

  const set1 = match.sets.find((s) => s.setNumber === 1);
  const set2 = match.sets.find((s) => s.setNumber === 2);
  const set3 = match.sets.find((s) => s.setNumber === 3);
  return {
    matchId: match.id,
    team1Set1: set1?.team1Score,
    team2Set1: set1?.team2Score,
    team1Set2: set2?.team1Score,
    team2Set2: set2?.team2Score,
    team1Set3: set3?.team1Score,
    team2Set3: set3?.team2Score,
  };
};
