import * as Yup from "yup";

export const email = {
  email: Yup.string()
    .email("The email is invalid")
    .required("Email is required"),
};

export const password = {
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be atleast 6 characters")
    .max(30, "Password is too long"),
};
