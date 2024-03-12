import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import TopBar from "./TopBar";
import Post from "./Post";
// import { useDispatch, useSelector } from "react-redux";

import { postService } from "../Firebase/postService";
import { IPost, TPostList } from "../Redux/Slice/CurrentPostSlice";
import { RootState } from "../Redux/store";
import {
  newPostUpLoadingContinue,
  newPostUpLoadingDone,
} from "../Redux/Slice/CreatePostSlice";
import { AtHome } from "../Redux/Slice/NavSlice";
import PostsLoader from "./SmallComponents/loaders/PostsLoader";
import { FieldValue } from "firebase/firestore";
import Spiner from "./SmallComponents/loaders/Spiner";
export interface IPosts extends IPost {
  createdAt: FieldValue;
}
function Home() {
  const newPost = useSelector(
    (state: RootState) => state.CreatePostInfo.uploadedPost
  );
  const loadingUpLoadedPost = useSelector(
    (state: RootState) => state.CreatePostInfo.loadingUpLoadedPost
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
        const firstPostList = await postService.getFirstPosts();

        if (firstPostList) {
          setPostList([...firstPostList]);
          setPostCount(firstPostList.length);
          setLastElement(firstPostList[firstPostList.length - 1].createdAt);
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
      if (entries[0].isIntersecting && postCount >= 5) {
        (async () => {
          try {
            const nextPostList = await postService.getNextPosts(
              lastElement as FieldValue
            );

            if (nextPostList) {
              console.log(nextPostList);

              setPostList((pre) => [...pre, ...nextPostList]);
              setLastElement(nextPostList[nextPostList.length - 1].createdAt);
              setPostCount(nextPostList.length);
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

      setPostList((pre) => [post, ...pre]);
      dispatch(newPostUpLoadingContinue(false));
      dispatch(newPostUpLoadingDone());
      dispatch(AtHome());
    }
  }, [newPost]);

  return (
    <>
      <div className=" dark:bg-gray-700 w-full sticky  top-0  md:hidden">
        <TopBar></TopBar>
      </div>

      <div className=" w-full px-5 pb-[5.1rem]  md:px-0 md:w-[468px]">
        {/* uploading new post */}
        {loadingUpLoadedPost && (
          <div className="w-full p-5 rounded-xl mt-2 border-2 border-slate-200 flex justify-start gap-3 items-center ">
            {" "}
            <span>
              {" "}
              <Spiner w={6} h={6}></Spiner>
            </span>
            <span className="font-bold">new post uploading...</span>{" "}
          </div>
        )}

        {/* render present posts */}
        {isLoding ? (
          <PostsLoader></PostsLoader>
        ) : (
          postList.map((post) => (
            <Post key={post.postId} posts={{ ...post }}></Post>
          ))
        )}

        {/* observer for infinite scrolling */}
        <div ref={intersectionObserverRef}></div>
      </div>
    </>
  );
}

export default Home;
