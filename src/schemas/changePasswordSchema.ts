import validator from "../utils/customValidator";

export const changePasswordSchema = validator
  .object({
    currentPassword: validator.string().isRequired(),
    newPassword: validator
      .string()
      .isRequired()
      .minStr(8)
      .maxStr(40)
      .passwordValid(),
    confirmPassword: validator
      .string()
      .oneOf([validator.ref("newPassword")], "Las contraseñas no coinciden")
      .isRequired(),
  })
  .defined();
