import { jwtDecode } from "jwt-decode";
import { JWTPayload } from "../types";

export const decodeToken = (token: string) => {
  try {
    const payload = jwtDecode<JWTPayload>(token);
    return payload;
  } catch (error) {
    console.error("Error al decodificar JWT:", error);
    return null;
  }
};
