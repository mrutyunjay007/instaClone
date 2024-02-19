import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Post from "./Post";
import { RootState } from "../Redux/store";
import { postService } from "../Firebase/postService";
import { IPost } from "../Redux/Slice/CurrentPostSlice";
import BackIcon from "../assets/Back.png";

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
    <div className="flex flex-col w-screen">
      <div className="  bg-white w-full h-[9vh] sticky flex justify-center items-center gap-3 top-0  border-b-2 border-s-slate-100 ">
        <span className=" absolute md:left-[80px] cursor-pointer">
          <img src={BackIcon} alt="" />
        </span>
        <span className=" font-bold text-2xl cursor-pointer">Post</span>
      </div>
      <div className=" flex w-full  justify-center  items-center px-10">
        <div className=" w-full md:w-3/4 lg:w-1/2">
          {post && <Post posts={post}></Post>};
        </div>
      </div>
    </div>
  );
  //   return <div>{post && <Post posts={post}></Post>}</div>;
}

export default ShowSinglePost;
