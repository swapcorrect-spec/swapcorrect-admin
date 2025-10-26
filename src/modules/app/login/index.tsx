import React, { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "sonner";
import { Stack, Box, Link, IconButton } from "@chakra-ui/react";
import { Eye, EyeOff } from "lucide-react";

import { useLogin } from "~/hooks/queries/auth/auth";
import { PATHS } from "~/modules/_constants/paths";
import  {  type loginPayload } from "./_validation";
import AuthForm from "~/modules/shared/AuthForm";
import { Button, Input } from "~/modules/shared";

const Login: React.FC = () => {
  const navigate = useNavigate();
const [showPassword, setShowPassword] = useState(false);

  const toggleVisibility = () => setShowPassword((prev: boolean) => !prev);
  const { mutate, isPending } = useLogin({
    onSuccess(_val: { displayMessage: string; result: { jwt: string } }) {
      toast.success(_val.displayMessage, {
        onAutoClose: () => {
          localStorage.setItem("access-token", _val.result.jwt);
          navigate(`${PATHS.DASHBOARD}`);
        },
      });
    },
    onError(_err: any) {
      toast.error(_err);
    },
  });

  const handleLogin = (data: loginPayload) => {
    mutate({
      payload: {
        email: data.email,
        password: data.password,
      },
    });
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: handleLogin,
    validateOnBlur: false,
    // validationSchema,
  });

  const { values, handleChange, handleSubmit, errors } = formik;

  return (
    <AuthForm
      title="Welcome Back, Swapper!"
      subtitle="Log in to continue your swap journey."
    >
      {/* <Button variant={"secondary"} className="w-full py-6 border-[#EEEEEE] border text-[#000000] font-medium text-lg">
        <GoogleIcon style={{ width: "30px", height: "30px" }} /> Continue with Google
      </Button> */}

      <form onSubmit={handleSubmit}>
        <Stack gap={6} mt={4}>
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
          <Box>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              handleChange={handleChange}
              value={values.password}
              error={!!errors.password}
              errorMessage={errors.password}
              label="Password"
            />
            <Box display="flex" justifyContent="flex-end" pt={2}>
              <Link color="#898989" fontSize="xs" w="fit-content" asChild>
                <RouterLink to={"/forgot-password"}>
                  Forgot Password
                </RouterLink>
              </Link>
            </Box>
          </Box>
          <Button
            loading={isPending}
            type="submit"
          >
            Sign In
          </Button>
        </Stack>
      </form>
    </AuthForm>
  );
};

export default Login;
