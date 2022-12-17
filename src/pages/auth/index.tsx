import React, { useEffect, useState } from "react";
import {
  Button,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useAuthContext } from "../../contexts/auth-context";
import {
  AuthFormWrapper,
  AuthTextFieldWrapper,
  AuthTextForgotPassword,
  AuthWrapper,
} from "./styled";
import { useFormik } from "formik";
import { IAuth } from "../../types/auth";
import { SignInSchema, SignUpSchema } from "../../validation/auth";
import ForgotPasswordModal from "../../components/modals/forgot-password-modal";
import FormInputItem from "../../components/form-item";
import WrongCredentialsModal from "../../components/modals/wrong-credentials-modal";
import { Paper } from "@mui/material";

const Auth = () => {
  const [authType, setAuthType] = useState("signUp");
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] =
    useState(false);
  const [isWrongCredentialsModalOpen, setIsWrongCredentialsModalOpen] =
    useState(false);
  const toggleForgotPasswordModalState = () =>
    setIsForgotPasswordModalOpen((prev) => !prev);

  const toggleWrongCredentialsModalState = () =>
    setIsWrongCredentialsModalOpen((prev) => !prev);

  const isSignUpType = authType === "signUp";
  const text = isSignUpType ? "Sign Up" : "Sign In";
  const initialValues = {
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  };
  const { register, login } = useAuthContext();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: isSignUpType ? SignUpSchema : SignInSchema,
    onSubmit: (values: IAuth) => {
      const { username, email, password } = values;
      if (isSignUpType) {
        register(email, username, password, toggleWrongCredentialsModalState);
      } else {
        login(email, password, toggleWrongCredentialsModalState);
      }
      formik.resetForm();
    },
    validateOnChange: false,
    validateOnBlur: false,
  });

  const handleToggleButtonChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAuthType(newAlignment);
  };

  useEffect(() => {
    formik.resetForm();
  }, [authType]);

  return (
    <AuthWrapper>
        <AuthFormWrapper elevation={5}>
          <Typography variant="h3" fontWeight="bold">
            {text}
          </Typography>
          <ToggleButtonGroup
            color="primary"
            value={authType}
            exclusive
            onChange={handleToggleButtonChange}
            sx={{ my: 2 }}
          >
            <ToggleButton sx={{ px: 4, py: 1 }} value="signUp">
              Sign Up
            </ToggleButton>
            <ToggleButton sx={{ px: 4, py: 1 }} value="signIn">
              Sign In
            </ToggleButton>
          </ToggleButtonGroup>

          <form style={{ width: "100%" }} onSubmit={formik.handleSubmit}>
            <Grid container my={2} spacing={2} flexDirection="column">
              {isSignUpType && (
                <AuthTextFieldWrapper item xs={12}>
                  <FormInputItem
                    name="username"
                    label="Username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    errorLabel={formik?.errors.username as string}
                  />
                </AuthTextFieldWrapper>
              )}
              <AuthTextFieldWrapper item xs={12}>
                <FormInputItem
                  name="email"
                  label="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  errorLabel={formik?.errors.email as string}
                />
              </AuthTextFieldWrapper>
              <AuthTextFieldWrapper item xs={12}>
                <FormInputItem
                  name="password"
                  label="Password"
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  errorLabel={formik?.errors.password as string}
                />
              </AuthTextFieldWrapper>
              {isSignUpType && (
                <AuthTextFieldWrapper item xs={12}>
                  <FormInputItem
                    label="Confirm password"
                    name="confirmPassword"
                    type="password"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    errorLabel={formik?.errors.confirmPassword as string}
                    fullWidth
                  />
                </AuthTextFieldWrapper>
              )}
            </Grid>
            <Grid container spacing={2}>
              {!isSignUpType && (
                <Grid item xs={12} sx={{ display: "flex" }}>
                  <AuthTextForgotPassword
                    variant="body1"
                    onClick={() => toggleForgotPasswordModalState()}
                  >
                    Forgot password?
                  </AuthTextForgotPassword>
                </Grid>
              )}
              <Grid item xs={12}>
                <Button fullWidth type="submit" variant="outlined">
                  {text}
                </Button>
              </Grid>
            </Grid>
          </form>
        </AuthFormWrapper>
      <ForgotPasswordModal
        open={isForgotPasswordModalOpen}
        togglePostState={toggleForgotPasswordModalState}
      />
      <WrongCredentialsModal
        open={isWrongCredentialsModalOpen}
        togglePostState={toggleWrongCredentialsModalState}
      />
    </AuthWrapper>
  );
};

export default Auth;
