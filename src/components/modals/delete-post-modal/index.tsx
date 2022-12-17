import React, { FC } from "react";
import { Button, Grid } from "@mui/material";
import ModalWrapper from "../modal-wrapper";
import ModalInfo from "../modal-info";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { DeletePostModalProps } from "./props";

const DeletePostModal: FC<DeletePostModalProps> = ({
  postId,
  open,
  togglePostState,
}) => {
  return (
    <ModalWrapper
      togglePostState={() => togglePostState(postId, true)}
      open={open}
    >
      <ModalInfo
        icon={<DeleteForeverIcon sx={{ fontSize: 50 }} />}
        title="Are you sure you want to delete this post?"
        description="This post will be deleted forever"
      />
      <Grid item xs={12} mt={2} sx={{ width: "100%" }}>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => togglePostState(postId)}
            >
              Delete
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button fullWidth onClick={() => togglePostState(postId, true)}>
              cancel
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </ModalWrapper>
  );
};

export default DeletePostModal;
