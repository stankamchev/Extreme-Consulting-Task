import React, { FC } from "react";
import { Button, Grid } from "@mui/material";
import ModalWrapper from "../modal-wrapper";
import ModalInfo from "../modal-info";
import { ImageUploadModalProps } from "./props";
import ImageIcon from "@mui/icons-material/Image";
const ImageUploadModal: FC<ImageUploadModalProps> = ({
  open,
  togglePostState,
  localImageUrl,
}) => {
  return (
    <ModalWrapper togglePostState={togglePostState} open={open}>
      <ModalInfo
        icon={<ImageIcon sx={{ fontSize: 50 }} />}
        title="Image upload successfully."
        description="You can continue writing your post."
      />
      <Grid item xs={12} sx={{ width: "100%" }}>
        {localImageUrl && (
          <img
            style={{
              width: "100%",
              height: "auto",
              maxHeight: 300,
              objectFit: "contain",
            }}
            src={localImageUrl}
            alt=""
          />
        )}
      </Grid>
      <Grid item xs={12} sx={{ width: "100%" }}>
        <Button fullWidth variant="contained" onClick={() => togglePostState()}>
          Continue
        </Button>
      </Grid>
    </ModalWrapper>
  );
};

export default ImageUploadModal;
