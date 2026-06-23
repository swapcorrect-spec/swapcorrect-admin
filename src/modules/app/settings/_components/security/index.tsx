import { Box, Text } from "@chakra-ui/react";
import { useFormik } from "formik";
import { toast } from "sonner";
import { useChangeSignedInPassword } from "~/hooks/queries/auth/auth";
import type { IChangeSignedInPasswordResponse } from "~/hooks/queries/auth/auth.type";
import { Button, Header, PasswordInput } from "~/modules/shared";
import {
  changePasswordSchema,
  type ChangePasswordFormValues,
} from "./_validation";

const Security = () => {
  const { mutate, isPending } = useChangeSignedInPassword({
    onSuccess(response: IChangeSignedInPasswordResponse) {
      toast.success(response.displayMessage || "Password updated successfully");
      resetForm();
    },
    onError(message) {
      toast.error(message);
    },
  });

  const handleSubmit = (values: ChangePasswordFormValues) => {
    mutate({
      payload: {
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      },
    });
  };

  const {
    values,
    handleChange,
    handleSubmit: submitForm,
    errors,
    touched,
    resetForm,
  } = useFormik<ChangePasswordFormValues>({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema: changePasswordSchema,
    validateOnBlur: false,
    onSubmit: handleSubmit,
  });

  return (
    <Box mt={10}>
      <Header
        title="Security"
        description="Update your password and keep your account secure"
      />

      <Box w="711px" mt={10}>
        <form
          onSubmit={submitForm}
          style={{ display: "flex", gap: "20px", flexDirection: "column" }}
        >
          <PasswordInput
            name="oldPassword"
            handleChange={handleChange}
            placeholder="Enter current password"
            value={values.oldPassword}
            label="Current Password"
            error={!!(touched.oldPassword && errors.oldPassword)}
            errorMessage={errors.oldPassword}
          />
          <PasswordInput
            name="newPassword"
            handleChange={handleChange}
            placeholder="Enter new password"
            value={values.newPassword}
            label="New Password"
            error={!!(touched.newPassword && errors.newPassword)}
            errorMessage={errors.newPassword}
          />
          <PasswordInput
            name="confirmNewPassword"
            handleChange={handleChange}
            placeholder="Confirm new password"
            value={values.confirmNewPassword}
            label="Confirm New Password"
            error={!!(touched.confirmNewPassword && errors.confirmNewPassword)}
            errorMessage={errors.confirmNewPassword}
          />
          <Button
            type="submit"
            variant="solid"
            bg="#222222"
            width="fit-content"
            loading={isPending}
          >
            <Text color="#fff">Save Changes</Text>
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Security;
