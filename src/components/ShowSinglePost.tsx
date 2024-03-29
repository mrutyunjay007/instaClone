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
    <div>
      <div className="  dark:bg-background bg-white w-screen h-[9vh] sticky flex justify-center items-center gap-3 top-0  border-b-2 border-s-slate-100 ">
        <BackBtn></BackBtn>
        <span className=" dark:text-color font-bold text-2xl cursor-pointer">
          Post
        </span>
      </div>
      <div className=" flex w-full  justify-center  items-center ">
        {post && <Post posts={post}></Post>}
      </div>
    </div>
  );
}

export default ShowSinglePost;
