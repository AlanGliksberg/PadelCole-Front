import { Gender } from "../gender/Gender";
import { Team } from "../player/Team";
import { Status } from "./Status";

export type Match = {
  id: string;
  dateTime: string;
  location: string;
  description: string | null;
  category: string;
  pointsDeviation: number | null;
  status: Status;
  createdAt: Date;
  creatorPlayerId: string;
  gender: Gender;
  duration: number;
  teams: Team[];
  date: string;
  time: string;
};
