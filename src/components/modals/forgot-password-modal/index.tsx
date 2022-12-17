import React, { FC } from "react";
import { Button, Grid } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { ForgotPasswordSchema } from "../../../validation/reset-password";
import { useFormik } from "formik";
import FormInputItem from "../../form-item";
import { useAuthContext } from "../../../contexts/auth-context";
import { IAuth } from "../../../types/auth";
import ModalWrapper from "../modal-wrapper";
import ModalInfo from "../modal-info";
import { ModalProps } from "../props";

interface FormValues {
  email: IAuth["email"];
}

const ForgotPasswordModal: FC<ModalProps> = ({
  open,
  togglePostState,
}) => {
  const { forgotPassword } = useAuthContext();
  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: ForgotPasswordSchema,
    onSubmit: (values: FormValues) => {
      const { email } = values;
      forgotPassword(email, togglePostState);
      formik.resetForm();
    },
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <ModalWrapper togglePostState={togglePostState} open={open}>
      <ModalInfo
        icon={<LockIcon sx={{ fontSize: 50 }} />}
        title="Forgot your password ?"
        description="You can reset your password here."
      />
      <Grid item xs={12} sx={{ width: "100%" }}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container gap={1}>
            <Grid item xs={12}>
              <FormInputItem
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                errorLabel={formik?.errors.email as string}
              />
            </Grid>
            <Grid item xs={12}>
              <Button fullWidth type="submit" variant="outlined">
                Send Email
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </ModalWrapper>
  );
};

export default ForgotPasswordModal;
