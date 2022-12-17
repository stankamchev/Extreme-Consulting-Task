import React, { useEffect, useState } from "react";
import { collection, orderBy, query } from "firebase/firestore";
import CreatePost from "../../components/post/create-post-form";
import Post from "../../components/post/";
import Profile from "../../components/profile";
import { IPost } from "../../types/posts";
import { HomeItems, HomeWrapper } from "./styled";
import { db } from "../../config/firebase";
import useGetQueryData from "../../hooks/use-get-query-data";

const Home = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const getPostQueryData = useGetQueryData;
  useEffect(() => {
    const postRefs = collection(db, "posts");
    const postQuery = query(postRefs, orderBy("timestamp", "desc"));
    const getPosts = async () => {
      const allPosts = await getPostQueryData<IPost>(postQuery);
      setPosts(allPosts);
    };
    getPosts();
  }, []);

  const removePost = (id: string) => {
    const currentPosts = posts.filter((post) => post.id !== id);
    setPosts(currentPosts);
  };

  const addPost = (post: IPost) => {
    const allPosts = [...posts, post];
    const filterPostsByDate = allPosts.sort((prev, curr) => {
      const currData = new Date(curr.timestamp.seconds).valueOf();
      const prevData = new Date(prev.timestamp.seconds).valueOf();
      return currData - prevData;
    });
    setPosts(filterPostsByDate);
  };

  return (
    <HomeWrapper container>
      <HomeItems item xs={11} sm={8} md={7} lg={6} flexDirection="column">
        <Profile />
        <CreatePost addPost={addPost} />
        {posts.map((post) => {
          return (
            <Post
              key={post.id}
              userId={post.user_id}
              id={post.id}
              message={post.post_message}
              postPicture={post.post_picture}
              username={post.username}
              timestamp={post.timestamp}
              removePost={removePost}
            />
          );
        })}
      </HomeItems>
    </HomeWrapper>
  );
};

export default Home;
