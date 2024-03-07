import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Post from "./Post";
import { RootState } from "../Redux/store";
import { postService } from "../Firebase/postService";
import { IPost } from "../Redux/Slice/CurrentPostSlice";
import BackBtn from "./SmallComponents/BackBtn";

function ShowSinglePost() {
  const postId = useSelector(
    (state: RootState) => state.CurrentGallaryPostInfo.postId
  );

  const [post, setPost] = useState<IPost>();

  useEffect(() => {
    postId.length > 0 &&
      (async () => {
        const postInfo = await postService.showSinglePost({ postId });
        if (postInfo) {
          setPost(postInfo);
        }
      })();
  }, [postId]);

  return (
    <>
      <div className="  dark:bg-background bg-white sticky w-full h-[5.1rem] flex justify-start items-center gap-3 top-0  border-b-2 md:border-none border-s-slate-100 ">
        <BackBtn></BackBtn>
        <span className=" dark:text-color font-bold text-2xl ml-2  md:font-normal">
          Post
        </span>
      </div>
      <div className="  w-full px-5 md:px-0 md:w-[468px] pb-[5.1rem] md:pb-0 ">
        {post && <Post posts={post}></Post>}
      </div>
    </>
  );
}

export default ShowSinglePost;
