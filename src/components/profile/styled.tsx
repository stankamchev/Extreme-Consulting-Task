import { Avatar, Box, Button, Grid, styled } from "@mui/material";

export const ProfileWrapper = styled(Grid)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  marginTop: theme.spacing(3),
}));

export const ProfilePicture = styled(Avatar)({
  width: 100,
  height: 100,
  margin: "0 auto",
});

export const ProfileItems = styled(Grid)({
  display: "flex",
  justifyContent: "center",
});

export const ProfileLogoutButton = styled(Button)({
  position: "absolute",
  right: 0,
  top: 0,
});
