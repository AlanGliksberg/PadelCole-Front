import { GOOGLE_LOGIN_URI, LOGIN_URI } from "../constants/api";
import { LoginResponse } from "../types";
import { post } from "./api";

export const login = async (email: string, password: string) => {
  return await post<LoginResponse>(LOGIN_URI, { body: { email, password } });
};

export const googleLogin = async (idToken: string) => {
  return await post<LoginResponse>(GOOGLE_LOGIN_URI, {
    body: { idToken },
  });
};
