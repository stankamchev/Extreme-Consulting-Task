import { Grid, Typography } from "@mui/material";
import React, { FC } from "react";
import { ModalInfoProps } from "./props";

const ModalInfo: FC<ModalInfoProps> = ({ title, description, icon }) => {
  return (
    <>
      <Grid item xs={12}>
        {icon}
      </Grid>
      <Grid item xs={12} textAlign="center">
        <Typography variant="h4" component="h3">
          {title}
        </Typography>
      </Grid>
      <Grid item xs={12} textAlign="center">
        <Typography variant="body1" component="p">
          {description}
        </Typography>
      </Grid>
    </>
  );
};

export default ModalInfo;
