// import React from 'react'
import { VscAccount } from "react-icons/vsc";
import Engagments from "./Engagments";
import post from "../assets/js-mock-up.png.png";
import { IPost } from "../Redux/Slice/PostSlice";

function Post({
  posts: { postId, userId, userName, profilePic, postUrl, caption, likeCount },
}: {
  posts: IPost;
}) {
  return (
    <div className=" flex flex-col  gap-2 mt-2 bg-white mb-4 border-b-2 border-s-slate-100 ">
      {/* User Info */}
      <div className="flex w-full justify-start items-center gap-2">
        <span className="ml-2">
          <VscAccount className="w-8 h-8" />
        </span>
        <span className=" font-bold">Name</span>
      </div>
      {/* Posted Image */}
      <div className="w-full">
        <img className="w-full h-full overflow-hidden" src={postUrl} alt="" />
      </div>
      {/* Responses */}
      <div className="w-full">
        <Engagments></Engagments>
      </div>
    </div>
  );
}

export default Post;
