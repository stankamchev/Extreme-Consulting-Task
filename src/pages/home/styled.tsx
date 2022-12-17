import { Grid } from "@mui/material";
import { styled } from "@mui/system";

export const HomeWrapper = styled(Grid)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  marginTop: theme.spacing(3),
}));

export const HomeItems = styled(Grid)({
  display: "flex",
  justifyContent: "center",
  position: "relative",
});
