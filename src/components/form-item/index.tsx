import React, { FC } from "react";
import { Grid, TextField } from "@mui/material";
import { FormInputItemProps } from "./props";
import { FormItemErrorText } from "./styled";

const FormInputItem: FC<FormInputItemProps> = ({ errorLabel, ...rest }) => {
  return (
    <Grid container textAlign="left">
      <Grid item xs={12}>
        <TextField {...rest} error={!!errorLabel?.length} fullWidth />
      </Grid>
      <Grid item xs={12}>
        <FormItemErrorText variant="body1">
          {errorLabel && errorLabel}
        </FormItemErrorText>
      </Grid>
    </Grid>
  );
};

export default FormInputItem;
