import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import { auth } from "../../config/firebase";
import {
  ProfileItems,
  ProfileLogoutButton,
  ProfilePicture,
  ProfileWrapper,
} from "./styled";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import UploadImageButton from "../upload-image-button";
import { useAuthContext } from "../../contexts/auth-context";
import useUploadImage from "../../hooks/use-upload-image";
import { useProfileContext } from "../../contexts/profile-context";

const Profile = () => {
  const { currentUser } = auth;
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  const uploadImage = useUploadImage;
  const { logout } = useAuthContext();
  const { updateUserProfile, profilePicture } = useProfileContext();

  useEffect(() => {
    const uploadProfileImage = async () => {
      if (uploadedImage && currentUser?.uid) {
        const imageUrl = await uploadImage("profile-pictures", uploadedImage);
        if (imageUrl) {
          await updateUserProfile(currentUser, { imageUrl });
        }
      }
    };
    uploadProfileImage();
  }, [uploadedImage]);

  return (
    <ProfileWrapper container>
      <ProfileItems item xs={10} md={8} lg={6}>
        <Grid container gap={2} flexDirection="column">
          <Grid item>
            <ProfilePicture src={profilePicture} />
          </Grid>
          <Grid item>
            <Typography variant="h5" component="h2">
              {currentUser && currentUser.displayName}
            </Typography>
            <Typography variant="h6" component="h3">
              {currentUser && currentUser.email}
            </Typography>
          </Grid>
          <Grid item>
            <UploadImageButton
              startIcon={<FileUploadIcon />}
              id="profile-picture-upload"
              setUploadedImage={setUploadedImage}
              buttonText="Upload new profile picture"
            />
          </Grid>
          <Grid item>
            <ProfileLogoutButton onClick={async () => await logout()}>
              Logout
            </ProfileLogoutButton>
          </Grid>
        </Grid>
      </ProfileItems>
    </ProfileWrapper>
  );
};

export default Profile;
