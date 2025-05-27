import { Gender } from "../gender/Gender";

export type Player = {
  id: string;
  firstName: string;
  lastName: string;
  level: string;
  rankingPoints: number | null;
  phone: string | null;
  userId: string | null;
  gender: Gender | null;
};
