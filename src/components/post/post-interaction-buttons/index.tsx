import React, { FC } from "react";
import { PostInteractionButtonsProps } from "./props";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import {
  PostInteractionButtonsThumb,
  PostInteractionButtonsWrapper,
} from "./styled";
import { Typography } from "@mui/material";
import { PostItemsWrapper } from "../styled";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  DocumentReference,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { IInteraction } from "../../../types/interaction";
import { db } from "../../../config/firebase";
import { theme } from "../../../theme";

const PostInteractionButtons: FC<PostInteractionButtonsProps> = ({
  setLikePostState,
  modifyPostState,
  deletePostState,
  currentPostId,
  currentUserId,
  postInteraction,
}) => {
  const postInteractionsRefs = collection(db, "post_interactions");

  const getUpdatePostInteraction = (userId: string, state: number) => {
    return {
      user_id: userId,
      state: state,
      post_id: currentPostId,
    };
  };

  const getIsUserInteractedPost = (state: number) => {
    const isInteracted = postInteraction.interactions.find((interaction) => {
      return (
        interaction.user_id === currentUserId && interaction.state === state
      );
    });
    return isInteracted ? 1 : 0;
  };

  const getPostInteractionsCount = (state: number) => {
    return postInteraction.interactions.filter(
      (interaction) => interaction.state === state
    ).length;
  };

  const likePost = async (userId: string, state: number) => {
    const createInteractionData = getUpdatePostInteraction(userId, state);
    const createdInteraction = await addDoc(
      postInteractionsRefs,
      createInteractionData
    );
    const interactionDoc = await getDoc(createdInteraction);
    const interactionData = interactionDoc.data() as IInteraction;

    if (interactionData) {
      setLikePostState(interactionDoc.id, state, interactionData);
    }
  };

  const deletePostInteraction = async (
    currentPostInteraction: DocumentReference<DocumentData>,
    userId: string
  ) => {
    deleteDoc(currentPostInteraction);
    deletePostState(userId);
  };

  const modifyPostInteraction = async (
    currentPostInteraction: DocumentReference<DocumentData>,
    userId: string,
    state: number
  ) => {
    const updateInteractionData = getUpdatePostInteraction(userId, state);
    await updateDoc(currentPostInteraction, updateInteractionData);
    modifyPostState(
      currentPostInteraction.id,
      updateInteractionData.state,
      updateInteractionData
    );
  };

  const interactPost = async (isLikePost: boolean) => {
    const state = isLikePost ? 1 : -1;

    if (!postInteraction.id) {
      await likePost(currentUserId, state);
    } else {
      const currentPostInteraction = doc(
        db,
        "post_interactions",
        postInteraction.id
      );

      if (postInteraction?.state === state) {
        await deletePostInteraction(currentPostInteraction, currentUserId);
      } else {
        await modifyPostInteraction(
          currentPostInteraction,
          currentUserId,
          state
        );
      }
    }
  };
  return (
    <PostItemsWrapper pb={2} gap={1.5}>
      <PostInteractionButtonsWrapper item>
        <PostInteractionButtonsThumb
          theme={theme}
          interacted={getIsUserInteractedPost(1)}
          as={ThumbUpIcon}
          onClick={async () => await interactPost(true)}
        />
        <Typography>{getPostInteractionsCount(1)}</Typography>
      </PostInteractionButtonsWrapper>
      <PostInteractionButtonsWrapper item>
        <PostInteractionButtonsThumb
          theme={theme}
          interacted={getIsUserInteractedPost(-1)}
          as={ThumbDownIcon}
          onClick={async () => await interactPost(false)}
        />
        <Typography>{getPostInteractionsCount(-1)}</Typography>
      </PostInteractionButtonsWrapper>
    </PostItemsWrapper>
  );
};

export default PostInteractionButtons;
