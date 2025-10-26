import React, { useMemo, useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "sonner";
import { PinInput } from "react-input-pin-code";
import { Stack, Box, Heading, Text, Link } from "@chakra-ui/react";
import { useForgotPassword, useResetPassword } from "~/hooks/queries/auth/auth";
import { type ForgotPassword as ForgotPasswordProp, type ResetPassword } from "~/hooks/queries/auth/auth.type";
import { PATHS } from "~/modules/_constants/paths";
import AuthForm from "~/modules/shared/AuthForm";
import { Button, Input } from "~/modules/shared";
import { getValidationSchema } from "./_validation";

type formStep = "email" | "code" | "password";

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
 
  const [formStep, setFormStep] = useState<formStep>("email");

  const validationSchemas = useMemo(() => getValidationSchema(formStep), [formStep]);

  const { mutate, isPending } = useForgotPassword({
    onSuccess(_val: { result: string }) {
      toast.success(_val.result);
      setFormStep("code");
    },
    onError(_err) {
      toast.error(_err);
    },
  });

  const { mutate: mutateResetPassword, isPending: isPendingResetPassword } = useResetPassword({
    onSuccess(_val: { result: string }) {
      toast.success(_val.result, {
        onAutoClose: () => {
          navigate(`${PATHS.LOGIN}`);
        },
      });
      setFormStep("email");
      resetForm();
    },
    onError(_err) {
      toast.error(_err);
    },
  });

  const handleForgotPassword = (data: ForgotPasswordProp) => {
    mutate({
      payload: {
        email: data.email,
      },
    });
  };

  const handleResetPassword = (data: ResetPassword) => {
    const token = Array.isArray(data.token) ? data.token.join("") : data.token;

    mutateResetPassword({
      payload: {
        token,
        email: data.email,
        password: data.password,
      },
    });
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      token: ["", "", "", "", "", ""],
      password: "",
      confirm_password: "",
    },

    onSubmit: formStep === "email" ? handleForgotPassword : handleResetPassword,
    validateOnBlur: false,
    validationSchema: validationSchemas,
  });

  const { values, handleBlur, handleChange, handleSubmit, errors, touched, setFieldValue, resetForm } = formik;

  return (
    <AuthForm title="" subtitle="">
      <Box mb={10}>
        {formStep === "email" ? (
          <>
            <Heading color="#000000" fontSize={{ base: "2xl", md: "4xl" }} textAlign="left" fontWeight="medium">
              Forgot Password
            </Heading>
            <Text color="#737373" fontSize="base" fontWeight="normal" textAlign="left" mt={2} mb={8} lineHeight="tight">
              Enter Your Registered Email
            </Text>
          </>
        ) : formStep === "code" ? (
          <>
            <Heading color="#000000" fontSize={{ base: "2xl", md: "4xl" }} textAlign="left" fontWeight="medium">
              Input Email Verification Code
            </Heading>
            <Text color="#737373" fontSize="base" fontWeight="normal" textAlign="left" mt={2} mb={8} lineHeight="tight">
              Enter the 6 digits code sent to {values.email}
            </Text>
          </>
        ) : (
          <>
            <Heading color="#000000" fontSize={{ base: "2xl", md: "4xl" }} textAlign="left" fontWeight="medium">
              Create New Password
            </Heading>
            <Text color="#737373" fontSize="base" fontWeight="normal" textAlign="left" mt={2} mb={8} lineHeight="tight">
              Enter Your New Password
            </Text>
          </>
        )}
      </Box>
      <form onSubmit={handleSubmit}>
        <Stack gap={6} mt={4}>
          {formStep === "email" ? (
            <>
              <Input
                type="email"
                placeholder="Email address"
                name="email"
                handleChange={handleChange}
                value={values.email}
                error={!!errors.email}
                errorMessage={errors.email}
                label="Email Address"
              />
            </>
          ) : formStep === "code" ? (
            <Box>
              <PinInput
                values={values.token}
                onChange={(_, __, values) => {
                  setFieldValue("token", values);
                }}
                onComplete={() => {
                  setFormStep("password");
                }}
                containerClassName="justify-between"
                size="md"
                id="code"
                inputStyle={{
                  width: "5rem",
                  height: "5rem",
                  fontSize: "2rem",
                  textAlign: "center",
                }}
              />
              {errors.token && touched.token && (
                <Text mt={1} fontSize="sm" color="red.500" minH="1rem">
                  {errors.token}
                </Text>
              )}
            </Box>
          ) : (
            <>
              <Input
                type="password"
                placeholder="Password"
                name="password"
                handleChange={handleChange}
                value={values.password}
                error={!!errors.password}
                errorMessage={errors.password}
                label="Password"
              />
              <Input
                type="password"
                placeholder="Confirm Password"
                name="confirm_password"
                handleChange={handleChange}
                value={values.confirm_password}
                error={!!errors.confirm_password}
                errorMessage={errors.confirm_password}
                label="Confirm Password"
              />
            </>
          )}
          <Button type="submit" loading={isPending || isPendingResetPassword}>
            {formStep === "password" ? "Reset Password" : "Send"}
          </Button>
          <Text textAlign="center" pb={{ base: 10, md: 0 }}>
            Continue to{" "}
            <Link asChild color="blue.500">
              <RouterLink to={"/"}>Log in</RouterLink>
            </Link>
          </Text>
        </Stack>
      </form>
    </AuthForm>
  );
};

export default ForgotPassword;
