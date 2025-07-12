import { MATCH_STATUS } from "@/src/constants/match";

export type Status = {
  id: number;
  code: MATCH_STATUS;
  label: string;
  description?: string;
};
