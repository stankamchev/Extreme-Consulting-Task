import { styled } from "@mui/system";
import { PostIntercationButtonProps } from "./props";
import { Grid } from "@mui/material";

export const PostInteractionButtonsThumb = styled('div')(
  ({ theme, interacted }: PostIntercationButtonProps) => ({
    cursor: "pointer",
    color: interacted ? theme.palette.primary.main : "inherit",

    "&:hover": {
      color: theme.palette.primary.dark,
    },
  })
);

export const PostInteractionButtonsWrapper = styled(Grid)({
  display: "flex",
  gap: 5,
});
