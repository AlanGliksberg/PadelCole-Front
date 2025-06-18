import * as validator from "yup";

export const REQUIRED_LABEL = "Este campo es obligatorio";

declare module "yup" {
  interface StringSchema {
    isRequired(): StringSchema<string>;
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
