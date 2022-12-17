import { Theme } from "@emotion/react";
import { IInteraction, IPostInteraction } from "../../../types/interaction";

type interactPost = (
  id: string,
  state: number,
  interactionData: IInteraction
) => void;

export interface PostInteractionButtonsProps {
  setLikePostState: interactPost;
  modifyPostState: interactPost;
  deletePostState: (userId: string) => void;
  postInteraction: IPostInteraction;
  currentUserId: string;
  currentPostId: string;
}

export interface PostIntercationButtonProps {
  interacted: number;
  theme: any;
}
