import { LOGIN_URI } from "../constants/api";
import { LoginResponse } from "../types";
import { post } from "./api";

export const login = async (email: string, password: string) => {
  return await post<LoginResponse>(LOGIN_URI, { body: { email, password } });
};
