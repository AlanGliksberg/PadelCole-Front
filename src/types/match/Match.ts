import { Application } from "../application/Application";
import { Category } from "../player/Category";
import { Gender } from "../player/Gender";
import { Player } from "../player/Player";
import { Team } from "../player/Team";
import { Status } from "./Status";

export type Match = {
  id: number;
  dateTime: string;
  location: string;
  description: string | null;
  category: Category;
  pointsDeviation: number | null;
  status: Status;
  createdAt: Date;
  creatorPlayerId: number;
  gender: Gender;
  duration: number;
  players: Player[];
  teams: Team[];
  date: string;
  time: string;
  applications: Application[];
};
