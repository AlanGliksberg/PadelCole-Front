import {
  ACCEPT_APPLICATION_URI,
  APPLY_TO_MATCH_URI,
  GET_APPLICATION_STATUS_URI,
  REJECT_APPLICATION_URI,
} from "../constants/api";
import { ApplicationStatus } from "../types/application/Status";
import { get, post, put } from "./api";

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

export const applyToMatch = async (
  matchId: number,
  teamNumber: 1 | 2,
  message: string | undefined | null,
  phone: string | undefined | null
) => {
  return await post(APPLY_TO_MATCH_URI, {
    body: { matchId, teamNumber, message, phone },
  });
};

export const getApplicationStatus = async () => {
  return await get<{ status: ApplicationStatus[] }>(
    GET_APPLICATION_STATUS_URI,
    { withCache: true }
  );
};
