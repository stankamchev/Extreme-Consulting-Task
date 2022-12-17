import React from "react";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../config/firebase";

const useGetUserProfilePicture = async (currentUserId: string) => {
  if (currentUserId) {
    try {
      const imageName = `profile-pictures/${currentUserId}`;
      const imageRef = ref(storage, imageName);
      const uploadedImageURL = await getDownloadURL(imageRef);
      return uploadedImageURL;
    } catch (error) {
      console.error((error as Error).message);
      return "./anonymous-pic.png";
    }
  }
};

export default useGetUserProfilePicture;
