export type Question = {
  id: number;
  code: string;
  label: string;
  questionTypeId: number;

  answers: QuestionAnswer[];
  type: QuestionType;
};

export type QuestionAnswer = {
  id: number;
  code: string;
  label: string;
  points: number;
  questionId: number;
};

export type QuestionType = {
  id: number;
  code: QUESTION_TYPE;
};

export enum QUESTION_TYPE {
  SELECT = "SELECT",
  RADIO = "RADIO",
}
