import { Timestamp } from "../../types/posts";

export interface PostProps {
  message: string;
  username: string;
  postPicture: string;
  timestamp: Timestamp;
  id: string;
  userId: string;
  removePost: (id: string) => void;
}
