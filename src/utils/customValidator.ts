import * as validator from "yup";

const REQUIRED_LABEL = "Este campo es obligatorio";
const MIN_LABEL = (min: number) => `Mínimo ${min} caracteres`;
const MAX_LABEL = (max: number) => `Máximo ${max} caracteres`;

declare module "yup" {
  interface StringSchema {
    isRequired(): StringSchema<string>;
    minStr(minLength: number): StringSchema<string>;
    maxStr(maxLength: number): StringSchema<string>;
    passwordValid(): StringSchema<string>;
  }
  interface NumberSchema {
    isRequired(): NumberSchema<number>;
  }
  interface DateSchema {
    isRequired(): DateSchema<Date>;
  }
}

validator.addMethod<validator.StringSchema<string>>(
  validator.string,
  "isRequired",
  function () {
    return this.required(REQUIRED_LABEL);
  }
);

validator.addMethod<validator.StringSchema<string>>(
  validator.string,
  "minStr",
  function (minLength: number) {
    return this.min(minLength, MIN_LABEL(minLength));
  }
);

validator.addMethod<validator.StringSchema<string>>(
  validator.string,
  "maxStr",
  function (maxLength: number) {
    return this.max(maxLength, MAX_LABEL(maxLength));
  }
);

validator.addMethod<validator.StringSchema<string>>(
  validator.string,
  "passwordValid",
  function () {
    return this.test(
      "passwordValid",
      "Al menos una mayúscula, minúscula y un número",
      (value) => {
        if (!value) return false;
        return /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value);
      }
    );
  }
);

validator.addMethod<validator.NumberSchema<number>>(
  validator.number,
  "isRequired",
  function () {
    return this.required(REQUIRED_LABEL);
  }
);

validator.addMethod<validator.DateSchema<Date>>(
  validator.date,
  "isRequired",
  function () {
    return this.required(REQUIRED_LABEL);
  }
);

export default validator;
