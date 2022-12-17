import Grid from "@mui/material/Grid";
import React, { FC, useEffect, useState } from "react";
import { PostProps } from "./props";
import { PostDeleteButton, PostImage, PostWrapper } from "./styled";
import { collection, deleteDoc, doc, query, where } from "firebase/firestore";
import { db } from "../../config/firebase";
import useGetQueryData from "../../hooks/use-get-query-data";
import { IInteraction, IPostInteraction } from "../../types/interaction";
import DeletePostModal from "../modals/delete-post-modal";
import PostInteractionButtons from "./post-interaction-buttons";
import PostInfoBar from "./post-info-bar";
import useAuthGuard from "../../hooks/use-auth-guard";
import { Paper } from "@mui/material";

const Post: FC<PostProps> = ({
  message,
  username,
  userId,
  timestamp,
  postPicture,
  id,
  removePost,
}) => {
  const currentUserId = useAuthGuard();
  const [postInteraction, setPostInteraction] = useState<IPostInteraction>({
    id: "",
    state: 0,
    interactions: [],
  });
  const postInteractionsRefs = collection(db, "post_interactions");
  const getPostQueryData = useGetQueryData;
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  useEffect(() => {
    const getPostData = async () => {
      const interactedPostQuery = query(
        postInteractionsRefs,
        where("state", "in", [1, -1]),
        where("post_id", "==", id)
      );
      const interactedPosts = await getPostQueryData<IInteraction>(
        interactedPostQuery
      );
      const currentInteractedPost = interactedPosts.find(
        (post) => post.user_id === currentUserId
      );
      setPostInteraction({
        ...postInteraction,
        id: currentInteractedPost?.id || "",
        state: currentInteractedPost?.state || 0,
        interactions: interactedPosts,
      });
    };
    getPostData();
  }, [currentUserId]);

  const toggleDeleteModalState = async (id: string, isCancel?: boolean) => {
    if (isDeleteModalOpen && !isCancel) {
      await deletePost(id);
    }
    setIsDeleteModalOpen((prev) => !prev);
  };

  const deletePost = async (postId: string) => {
    const currentPostDoc = doc(db, "posts", postId);
    await deleteDoc(currentPostDoc);
    removePost(postId);
  };

  const setLikePostState = (
    id: string,
    state: number,
    interactionData: IInteraction
  ) => {
    setPostInteraction((prev) => ({
      ...prev,
      id,
      state,
      interactions: [...prev.interactions, interactionData],
    }));
  };

  const deletePostState = (userId: string) => {
    setPostInteraction((prev) => {
      const updatedInteraction = prev.interactions.filter(
        (interaction) => interaction.user_id !== userId
      );
      return {
        ...prev,
        id: "",
        state: 0,
        interactions: [...updatedInteraction],
      };
    });
  };

  const modifyPostState = (
    id: string,
    state: number,
    interactionData: IInteraction
  ) => {
    setPostInteraction((prev) => {
      const updatedInteraction = prev.interactions.map((interaction) => {
        if (interaction.user_id === interactionData.user_id) {
          return {
            ...interaction,
            id,
            state: interactionData.state,
          };
        }
        return interaction;
      });

      return {
        ...prev,
        id,
        state,
        interactions: [...updatedInteraction],
      };
    });
  };

  return (
    <>
      <PostWrapper my={3}>
        <Paper elevation={5}>
          <Grid container gap={1} justifyContent="space-between">
            <PostInfoBar
              username={username}
              userId={userId}
              timestamp={timestamp}
            />
            <Grid item alignSelf="center" pr={2}>
              {userId === currentUserId && (
                <PostDeleteButton onClick={() => toggleDeleteModalState(id)} />
              )}
            </Grid>
          </Grid>
          <Grid py={1} pl={2} item textAlign="left">
            {message}
          </Grid>
          <Grid item>
            {postPicture && <PostImage src={postPicture} alt={message} />}
          </Grid>
          <PostInteractionButtons
            setLikePostState={setLikePostState}
            deletePostState={deletePostState}
            modifyPostState={modifyPostState}
            postInteraction={postInteraction}
            currentPostId={id}
            currentUserId={currentUserId}
          />
        </Paper>
      </PostWrapper>
      <DeletePostModal
        open={isDeleteModalOpen}
        postId={id}
        togglePostState={toggleDeleteModalState}
      />
    </>
  );
};

export default Post;
