import { Team } from "../player/Team";

export type Match = {
  id: string;
  dateTime: string;
  location: string;
  description: string | null;
  category: string;
  duration: number;
  gender: string;
  status: { description: string };
  teams: Team[];
};
