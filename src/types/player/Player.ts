import { Gender } from "../gender/Gender";
import { User } from "../user/User";
import { Category } from "./Category";
import { Position } from "./Position";

export type Player = {
  id: string;
  firstName: string;
  lastName: string;
  categoryId: string;
  genderId: string;
  rankingPoints: number | null;
  phone: string | null;
  userId: string | null;
  positionId: string;

  position: Position | null;
  category: Category | null;
  gender: Gender | null;
  user: User | null;
};
