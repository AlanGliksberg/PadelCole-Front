import { get } from "./api";

export const getCreatedMatches = async <T>(page: number, pageSize: number) => {
  return await get<T>("/matches/me", {
    queryParams: { page, pageSize, createdBy: true },
    withCache: true,
  });
};
