import { PageParams } from "./Common";

export type GetPlayerParams = {
  name?: string | null;
  gender?: string[] | null;
  position?: string[] | null;
  category?: string[] | null;
} & PageParams;
