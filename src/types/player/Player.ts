import { Gender } from "../gender/Gender";
import { User } from "../user/User";

export type Player = {
  id: string;
  firstName: string;
  lastName: string;
  level: string;
  rankingPoints: number | null;
  phone: string | null;
  userId: string | null;
  gender: Gender | null;
  user?: User;
};
