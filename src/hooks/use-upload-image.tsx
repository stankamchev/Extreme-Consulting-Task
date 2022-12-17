import React from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as generateId } from "uuid";
import { auth, storage } from "../config/firebase";
const useUploadImage = async (imagePath: string, image: File) => {
  if (image) {
    const { currentUser } = auth;
    const imageName =
      imagePath === "profile-pictures"
        ? `${imagePath}/${currentUser?.uid}`
        : `${imagePath}/${image.name + generateId()}`;
    const imageRef = ref(storage, imageName);
    const uploadedImage = await uploadBytes(imageRef, image);
    const uploadedImageURL = await getDownloadURL(uploadedImage.ref);
    return uploadedImageURL;
  }
};

export default useUploadImage;
