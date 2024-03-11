import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import TopBar from "./TopBar";
import Post from "./Post";
// import { useDispatch, useSelector } from "react-redux";

import { postService } from "../Firebase/postService";
import { IPost, TPostList } from "../Redux/Slice/CurrentPostSlice";
import { RootState } from "../Redux/store";
import { newPostUpLoadingDone } from "../Redux/Slice/CreatePostSlice";
import { AtHome } from "../Redux/Slice/NavSlice";
import PostsLoader from "./SmallComponents/loaders/PostsLoader";
import { FieldValue } from "firebase/firestore";
export interface IPosts extends IPost {
  createdAt: FieldValue;
}
function Home() {
  const newPost = useSelector(
    (state: RootState) => state.CreatePostInfo.uploadedPost
  );

  const dispatch = useDispatch();
  const [postList, setPostList] = useState<TPostList>([]);

  const [isLoding, setIsLoding] = useState(true);

  // for infinite scroll
  const [lastElement, setLastElement] = useState<FieldValue>();
  const [postCount, setPostCount] = useState(0);
  const intersectionObserverRef = useRef(null);

  // activate home icon when back from other pages
  useEffect(() => {
    dispatch(AtHome());
  }, []);

  // Retrive First Posts
  useEffect(() => {
    (async () => {
      try {
        const postList = await postService.getFirstPosts();
        console.log(postList);

        if (postList) {
          setPostList([...postList]);
          setPostCount(postList.length - 1);
          setLastElement(postList[postList.length - 1].createdAt);
          setIsLoding(false);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  // Retrive Next Posts
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && postCount >= 1) {
        (async () => {
          try {
            const postList = await postService.getNextPosts(
              lastElement as FieldValue
            );

            if (postList) {
              console.log(postList);

              setPostList((pre) => [...pre, ...postList]);
              setLastElement(postList[postList.length - 1].createdAt);
              setPostCount((pre) => pre + (postList.length - 1));
              setIsLoding(false);
            }
          } catch (error) {}
        })();
      }
    });

    intersectionObserverRef.current &&
      observer.observe(intersectionObserverRef.current);

    return () => {
      if (intersectionObserverRef.current) {
        observer.unobserve(intersectionObserverRef.current);
      }
    };
  }, [postCount, lastElement]);

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
        <div ref={intersectionObserverRef}></div>
      </div>
      {/* </div> */}
      {/* </div> */}
    </>
  );
}

export default Home;
