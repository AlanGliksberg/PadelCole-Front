import { Match } from "..";

export type GetCreatedMatchesResponse = {
  matches: Match[];
  totalMatches: number;
};

export type CommonMatchResponse = {
  match: Match;
};

export type CreateMatchBody = {
  date: string;
  time: string;
  location: string;
  description?: string;
  categoryId: number;
  pointsDeviation?: number;
  genderId: number;
  duration: number;
  teams?: TeamCreate;
};

export type TeamCreate = {
  team1: PlayerCreate[];
  team2: PlayerCreate[];
};

export type PlayerCreate =
  | {
      id: number;
    }
  | {
      firstName: string;
      lastName: string;
      categoryId: number;
      genderId: number;
      phone?: string;
    };
