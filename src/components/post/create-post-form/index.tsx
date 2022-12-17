import React, { FC, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { useFormik } from "formik";
import { CreatePostSchema } from "../../../validation/create-post";
import FormInputItem from "../../form-item";
import UploadImageButton from "../../upload-image-button";
import { CreatePostFromAvatar, CreatePostWrapper } from "./styled";
import PhotoIcon from "@mui/icons-material/Photo";
import { Button, Paper } from "@mui/material";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../../lib/firebase";
import useUploadImage from "../../../hooks/use-upload-image";
import { useProfileContext } from "../../../contexts/profile-context";
import ImageUploadModal from "../../modals/image-upload-modal";
import { CreatePostFormProps } from "./props";
import { IPost } from "../../../types/posts";

const CreatePost: FC<CreatePostFormProps> = ({ addPost }) => {
  const { currentUser } = auth;
  const postRefs = collection(db, "posts");
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [localImageUrl, setLocalImageUrl] = useState("");
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const toggleImageUploadModalState = () => {
    setIsImageModalOpen((prev) => !prev);
  };

  const uploadImage = useUploadImage;
  const { profilePicture } = useProfileContext();
  useEffect(() => {
    if (uploadedImage) {
      setLocalImageUrl(URL.createObjectURL(uploadedImage));
      toggleImageUploadModalState();
    }
  }, [uploadedImage]);

  const formik = useFormik({
    initialValues: { post: "" },
    validationSchema: CreatePostSchema,
    onSubmit: async () => {
      if (uploadedImage) {
        const imageUrl = await uploadImage("post-pictures", uploadedImage);
        createPost(imageUrl);
        setUploadedImage(null);
      } else {
        createPost();
      }
      formik.resetForm();
    },
    validateOnChange: false,
    validateOnBlur: false,
  });

  const createPost = async (imageUrl?: string | undefined) => {
    if (currentUser?.uid) {
      const createdPost = await addDoc(postRefs, {
        username: currentUser?.displayName,
        timestamp: new Date(),
        post_message: formik.values.post,
        post_picture: imageUrl || "",
        user_id: currentUser?.uid,
      });
      const createdPostRef = doc(db, "posts", createdPost.id);
      const postData = await getDoc(createdPostRef);
      addPost({
        ...(postData.data() as IPost),
        id: postData.id,
      });
    }
  };

  return (
    <Paper elevation={5}>
      <form onSubmit={formik.handleSubmit}>
        <CreatePostWrapper container>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={2} sm={1}>
                <CreatePostFromAvatar src={profilePicture} />
              </Grid>
              <Grid item xs={10} sm={11} pl={2}>
                <FormInputItem
                  name="post"
                  placeholder={`Hey ${currentUser?.displayName}, what's on your mind ?`}
                  value={formik.values.post}
                  onChange={formik.handleChange}
                  errorLabel={formik?.errors.post as string}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container mt={2} justifyContent="space-between">
              <Grid item xs={12} sm={6} lg={4} sx={{ display: "flex" }}>
                <UploadImageButton
                  setUploadedImage={setUploadedImage}
                  startIcon={<PhotoIcon />}
                  id="post-picture-upload"
                  buttonText="Upload post picture"
                />
              </Grid>
              <Grid
                sx={{ display: "flex" }}
                justifyContent="flex-end"
                item
                xs={12}
                sm={6}
              >
                <Button type="submit">Запази</Button>
              </Grid>
            </Grid>
          </Grid>
        </CreatePostWrapper>
      </form>
      <ImageUploadModal
        open={isImageModalOpen}
        togglePostState={toggleImageUploadModalState}
        localImageUrl={localImageUrl}
      />
    </Paper>
  );
};

export default CreatePost;
