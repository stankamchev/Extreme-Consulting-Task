import * as Yup from "yup";
import { email } from "./common";

export const ForgotPasswordSchema = Yup.object({
  ...email,
});
