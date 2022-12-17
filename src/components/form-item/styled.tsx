import { styled } from "@mui/system";
import { Typography } from "@mui/material";

export const FormItemErrorText = styled(Typography)(({ theme }) => ({
  color: theme.palette.error.main,
}));
