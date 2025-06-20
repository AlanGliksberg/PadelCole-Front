const AUTH_BASE_URI = "/auth";
const MATCH_BASE_URI = "/matches";
const PLAYER_BASE_URI = "/player";

export const LOGIN_URI = `${AUTH_BASE_URI}/login`;
export const GOOGLE_LOGIN_URI = `${AUTH_BASE_URI}/google`;
export const REGISTER_URI = `${AUTH_BASE_URI}/register`;

export const GET_MY_MATCHES_URI = `${MATCH_BASE_URI}/me`;
export const DELETE_MATCH_URI = MATCH_BASE_URI;
export const CREATE_MATCH_URI = MATCH_BASE_URI;
export const ADD_PLAYER_TO_MATCH_URI = `${MATCH_BASE_URI}/player`;

export const GET_PLAYERS_URI = PLAYER_BASE_URI;
export const GET_GENDERS_URI = `${PLAYER_BASE_URI}/gender`;
export const GET_POSITIONS_URI = `${PLAYER_BASE_URI}/position`;
export const GET_CATEGORIES_URI = `${PLAYER_BASE_URI}/category`;
