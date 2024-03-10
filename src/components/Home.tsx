import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TopBar from "./TopBar";
import Post from "./Post";
// import { useDispatch, useSelector } from "react-redux";

import { postService } from "../Firebase/postService";
import { TPostList } from "../Redux/Slice/CurrentPostSlice";
import { RootState } from "../Redux/store";
import { newPostUpLoadingDone } from "../Redux/Slice/CreatePostSlice";
import { AtHome } from "../Redux/Slice/NavSlice";
import PostsLoader from "./SmallComponents/loaders/PostsLoader";

function Home() {
  const newPost = useSelector(
    (state: RootState) => state.CreatePostInfo.uploadedPost
  );

  const dispatch = useDispatch();
  const [postList, setPostList] = useState<TPostList>([]);

  const [isLoding, setIsLoding] = useState(true);

  // activate home icon when back from other pages
  useEffect(() => {
    dispatch(AtHome());
  }, []);

  // Retrive all Post
  useEffect(() => {
    (async () => {
      try {
        const postList = await postService.getAllPosts();
        console.log(postList);

        if (postList) {
          // dispatch(setPostList([...postList]));
          setPostList([...postList]);
          setIsLoding(false);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  // Add new Post
  useEffect(() => {
    if (newPost.postId.length > 0) {
      const post = {
        postId: newPost.postId,
        userId: newPost.userId,
        userName: newPost.userName,
        profilePic: newPost.profilePic,
        postUrl: newPost.postUrl as string,
        caption: newPost.caption,
        likeCount: newPost.likeCount,
      };

      setPostList((pre) => [...pre, post]);
      dispatch(newPostUpLoadingDone());
      dispatch(AtHome());
    }
  }, [newPost]);

  return (
    <>
      <div className=" dark:bg-gray-700 w-full sticky  top-0  md:hidden">
        <TopBar></TopBar>
      </div>
      {/* <div className=" flex  justify-center items-center w-full"> */}
      {/* <div className=" px-10"> */}
      <div className=" w-full px-5 md:px-0 md:w-[468px]">
        {isLoding ? (
          <PostsLoader></PostsLoader>
        ) : (
          postList.map((post) => (
            <Post key={post.postId} posts={{ ...post }}></Post>
          ))
        )}
      </div>
      {/* </div> */}
      {/* </div> */}
    </>
  );
}

export default Home;
