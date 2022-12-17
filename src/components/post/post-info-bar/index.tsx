import React, { FC, useEffect, useState } from "react";
import useGetUserProfilePicture from "../../../hooks/use-get-user-profile-picture";
import { PostItemsWrapper } from "../styled";
import { PostInfoBarProps } from "./props";
import { PostInfoBarAvatar } from "./styled";
import { Grid } from "@mui/material";
import { convertTimestampToDate } from "../../../utils/convertTimestampToDate";
import { useProfileContext } from "../../../contexts/profile-context";

const PostInfoBar: FC<PostInfoBarProps> = ({ userId, timestamp, username }) => {
  const [currentUserProfilePicture, setCurrentUserProfilePicture] =
    useState("");
  const getUserProfilePicture = useGetUserProfilePicture;
  const { profilePicture } = useProfileContext();
  const time = convertTimestampToDate(timestamp);

  useEffect(() => {
    const getProfilePicture = async () => {
      const profilePicture = await getUserProfilePicture(userId);
      setCurrentUserProfilePicture(profilePicture || "./anonymous-pic.png");
      console.log("idk man");
    };
    getProfilePicture();
  }, [profilePicture]);

  return (
    <PostItemsWrapper item gap={1}>
      <PostInfoBarAvatar src={currentUserProfilePicture} />
      <Grid container textAlign="left">
        <Grid item xs={12}>
          {username}
        </Grid>
        <Grid item xs={12}>
          {time && time}
        </Grid>
      </Grid>
    </PostItemsWrapper>
  );
};

export default PostInfoBar;
