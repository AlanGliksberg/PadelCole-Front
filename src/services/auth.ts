import { LOGIN_URI } from "../constants/api";
import { post } from "./api";

export const login = async <T>(email: string, password: string) => {
  return await post<T>(LOGIN_URI, { body: { email, password } });
};
