import React, { FC } from "react";
import { Button, Grid } from "@mui/material";
import NoEncryptionGmailerrorredIcon from "@mui/icons-material/NoEncryptionGmailerrorred";
import ModalWrapper from "../modal-wrapper";
import ModalInfo from "../modal-info";
import { ModalProps } from "../props";

const WrongCredentialsModal: FC<ModalProps> = ({ open, togglePostState }) => {
  return (
    <ModalWrapper togglePostState={togglePostState} open={open}>
      <ModalInfo
        icon={<NoEncryptionGmailerrorredIcon sx={{ fontSize: 50 }} />}
        title="Authentication Failed."
        description="Your email or password is incorrect. Please try again."
      />
      <Grid item xs={12} mt={2} sx={{ width: "100%" }}>
        <Button fullWidth variant="contained" onClick={() => togglePostState()}>
          Close
        </Button>
      </Grid>
    </ModalWrapper>
  );
};

export default WrongCredentialsModal;
