import { post } from "./api";

export const login = async <T>(email: string, password: string) => {
  return await post<T>("/auth/login", { body: { email, password } });
};
