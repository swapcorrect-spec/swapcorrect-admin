import { object, ref, string } from "yup";

export const changePasswordSchema = object().shape({
  oldPassword: string().required("Current password is required"),
  newPassword: string().required("New password is required"),
  confirmNewPassword: string()
    .required("Please confirm your new password")
    .oneOf([ref("newPassword")], "Passwords do not match"),
});

export type ChangePasswordFormValues = {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};
