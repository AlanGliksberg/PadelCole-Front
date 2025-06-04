import { Gender } from "../gender/Gender";
import { User } from "../user/User";
import { Category } from "./Category";
import { Position } from "./Position";

export type Player = {
  id: number;
  firstName: string;
  lastName: string;
  categoryId: number;
  genderId: number;
  rankingPoints: number | null;
  phone: string | null;
  userId: number | null;
  positionId: number;

  position: Position | null;
  category: Category | null;
  gender: Gender | null;
  user: User | null;
};
