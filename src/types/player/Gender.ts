export type Gender = {
  id: number;
  code: GENDER_CODE;
  name: string;
  pluralName: string;
};

export enum GENDER_CODE {
  DAMA = "D",
  CABALLERO = "C",
  MIXTO = "X",
}
