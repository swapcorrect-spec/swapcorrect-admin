import { array, object, ref, string } from "yup";

export const getValidationSchema = (formStep: string) =>
  object().shape({
    email: string()
      .email("Invalid email address")
      .when([], {
        is: () => formStep === "email",
        then: (schema) => schema.required("Required"),
        otherwise: (schema) => schema.notRequired(),
      }),

    token: array().when([], {
      is: () => formStep !== "code",
      then: (schema) => schema.notRequired(),
      otherwise: (schema) =>
        schema.required().test("all-digits-filled", "Required", (value) => {
          if (!Array.isArray(value)) return false;
          if (value.length !== 6) return false;
          return value.every((digit) => typeof digit === "string" && digit.trim() !== "");
        }),
    }),
    password: string().when([], {
      is: () => formStep === "password",
      then: (schema) => schema.required("Required"),
      otherwise: (schema) => schema.notRequired(),
    }),
    confirm_password: string().when([], {
      is: () => formStep === "password",
      then: (schema) => schema.required("Required").oneOf([ref("password")], "Passwords do not match"),
      otherwise: (schema) => schema.notRequired(),
    }),
  });
