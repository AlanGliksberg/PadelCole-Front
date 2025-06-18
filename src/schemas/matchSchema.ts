import validator from "../utils/customValidator";

export const matchSchema = validator.object({
  name: validator.string().isRequired(),
  description: validator.string().optional(),
  date: validator.date().isRequired(),
  time: validator.date().isRequired(),
  duration: validator
    .number()
    .isRequired()
    .oneOf([60, 90, 120], "Duración inválida"),
  genderId: validator.number().isRequired(),
  categoryId: validator.number().isRequired(),
});
