import { ModalProps } from "../props";

export interface DeletePostModalProps {
  open: ModalProps["open"];
  postId: string;
  togglePostState: (postId: string, isCancel?: boolean) => void;
}
