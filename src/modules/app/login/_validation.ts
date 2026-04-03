import { object, string, type InferType } from 'yup'

export const validationSchema = object().shape({
  email: string().email("Invalid email address").required("Required"),
  password: string().required("Required"),
});

export type loginPayload = InferType<typeof validationSchema>;