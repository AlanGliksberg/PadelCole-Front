import { APPLICATION_STATUS } from "@/src/constants/application";

export type ApplicationStatus = {
  id: number;
  code: APPLICATION_STATUS;
  label: string;
  description?: string;
};
