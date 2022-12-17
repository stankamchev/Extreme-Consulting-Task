import * as Yup from "yup";
import { password } from "./common";

const email = {
  email: Yup.string()
    .email("The email is invalid")
    .required("Email is required"),
};

export const SignUpSchema = Yup.object({
  username: Yup.string()
    .required("Username is required")
    .min(3, "Username must be atleast 3 characters")
    .max(30, "Username is too long"),
  ...email,
  ...password,
  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .min(6, "Confirm password must be atleast 6 characters")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

export const SignInSchema = Yup.object({
  ...email,
  ...password,
});
