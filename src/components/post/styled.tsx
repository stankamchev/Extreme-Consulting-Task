import { styled } from "@mui/system";
import DeleteIcon from "@mui/icons-material/Delete";
import { Grid, Box } from "@mui/material";

export const PostWrapper = styled(Box)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  background: "#dfdfdf",
}));

export const PostDeleteButton = styled(DeleteIcon)(({ theme }) => ({
  cursor: "pointer",
  color: theme.palette.error.main,
  fontSize: 25,
  "&:hover": {
    color: theme.palette.error.dark,
  },
}));

export const PostItemsWrapper = styled(Grid)(({ theme }) => ({
  display: "flex",
  paddingTop: theme.spacing(2),
  paddingLeft: theme.spacing(2),
}));

export const PostImage = styled("img")({
  objectFit: "contain",
  width: "100%",
  height: "auto",
});
