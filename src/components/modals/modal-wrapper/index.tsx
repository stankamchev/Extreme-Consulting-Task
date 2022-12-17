import React, { FC } from "react";
import { ModalWrapperProps } from "./props";
import {
  ModalWrapperContainer,
  ModalWrapperGrid,
  ModalWrapperGridCloseIcon,
} from "./styled";
import { Paper } from "@mui/material/";

const ModalWrapper: FC<ModalWrapperProps> = ({
  children,
  open,
  togglePostState,
}) => {
  return (
    <ModalWrapperContainer open={open}>
      <Paper elevation={5}>
        <ModalWrapperGrid gap={1}>
          <ModalWrapperGridCloseIcon onClick={togglePostState} />
          {children}
        </ModalWrapperGrid>
      </Paper>
    </ModalWrapperContainer>
  );
};

export default ModalWrapper;
