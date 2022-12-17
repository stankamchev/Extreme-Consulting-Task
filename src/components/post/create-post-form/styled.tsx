import { styled } from "@mui/system";
import { Avatar, Grid } from "@mui/material";

export const CreatePostFromAvatar = styled(Avatar)({
  width: 50,
  height: 50,
});

export const CreatePostWrapper = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.spacing(2),
  background: "#dfdfdf",
}));

export const CreatePostFormWrapper = styled(Grid)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
}));
