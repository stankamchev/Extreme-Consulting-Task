import * as Yup from "yup";

export const CreatePostSchema = Yup.object({
  post: Yup.string()
    .min(3, "The post message must be more than 3 characters")
    .required("post message is required"),
});
