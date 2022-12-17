import { Box, Paper, Grid, Typography } from "@mui/material";
import { styled } from "@mui/system";

export const AuthWrapper = styled(Box)({
  height: "100vh",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const AuthFormWrapper = styled(Paper)(({ theme }) => ({
  justifyContent: "center",
  alignItems: "center",
  width: "80%",
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),

  [theme.breakpoints.up("sm")]: {
    maxWidth: 500,
    padding: theme.spacing(6),
  },
}));

export const AuthTextFieldWrapper = styled(Grid)({
  width: "100%",
});

export const AuthTextForgotPassword = styled(Typography)(({ theme }) => ({
  cursor: "pointer",
  color: theme.palette.primary.main,
}));
