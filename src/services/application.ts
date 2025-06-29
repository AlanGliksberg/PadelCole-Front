import {
  ACCEPT_APPLICATION_URI,
  REJECT_APPLICATION_URI,
} from "../constants/api";
import { put } from "./api";

export const acceptApplication = async (
  applicationId: number,
  teamNumber: 1 | 2
) => {
  return await put(`${ACCEPT_APPLICATION_URI}/${applicationId}`, {
    body: { teamNumber },
  });
};

export const rejectApplication = async (applicationId: number) => {
  return await put(`${REJECT_APPLICATION_URI}/${applicationId}`);
};
