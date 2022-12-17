import { IPost } from "../../../types/posts";

export interface CreatePostFormProps {
  addPost: (post: IPost) => void;
}
