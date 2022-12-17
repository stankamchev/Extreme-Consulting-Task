import { Grid, Modal, Box } from "@mui/material";
import { styled } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";

export const ModalWrapperContainer = styled(Modal)({
  height: "100%",
  width: "100%",
});

export const ModalWrapperGrid = styled(Grid)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  background: "white",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  borderRadius: theme.spacing(2),
  padding: theme.spacing(3),
  width: "90%",

  [theme.breakpoints.up("sm")]: {
    maxWidth: 500,
    padding: theme.spacing(6),
  },
}));

export const ModalWrapperGridCloseIcon = styled(CloseIcon)({
  position: "absolute",
  right: "5%",
  top: "3%",
  cursor: "pointer",
});
