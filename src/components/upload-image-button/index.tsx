import { Button } from "@mui/material";
import React, { FC } from "react";
import { UploadImageButtonProps } from "./props";

const UploadImageButton: FC<UploadImageButtonProps> = ({
  setUploadedImage,
  id,
  buttonText,
  startIcon,
}) => {
  const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {      
      setUploadedImage(e.target.files[0]);
    }
  };
  return (
    <>
      <input
        type="file"
        accept="image/*"
        id={id}
        multiple={false}
        onChange={uploadImage}
        style={{ display: "none" }}
      />
      <label htmlFor={id}>
        <Button startIcon={startIcon} component="span" variant="contained">
          {buttonText}
        </Button>
      </label>
    </>
  );
};

export default UploadImageButton;
