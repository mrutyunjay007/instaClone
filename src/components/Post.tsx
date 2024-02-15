// import React from 'react'
import { VscAccount } from "react-icons/vsc";
import Engagments from "./Engagments";
// import post from "../assets/js-mock-up.png.png";
import { IPost } from "../Redux/Slice/CurrentPostSlice";
import { profileService } from "../Firebase/profileService";
import { useDispatch } from "react-redux";
import { addOthersinfo } from "../Redux/Slice/OthersSlice";
import { Link } from "react-router-dom";

function Post({
  posts: { postId, userId, userName, profilePic, postUrl, caption, likeCount },
}: {
  posts: IPost;
}) {
  const dispatch = useDispatch();

  return (
    <div className=" flex flex-col  gap-2 mt-2 bg-white mb-4 border-b-2 border-s-slate-100 ">
      {/* User Info */}

      <Link to="/othersProfile">
        <div
          className="flex w-full justify-start items-center gap-2 cursor-pointer"
          onClick={async () => {
            try {
              const otherUserInfo = await profileService.otherUserProfile({
                userId,
              });
              if (otherUserInfo) {
                dispatch(addOthersinfo({ ...otherUserInfo }));
              }
            } catch (error) {
              console.log(error);
            }
          }}
        >
          <span className="ml-2">
            <VscAccount className="w-8 h-8" />
          </span>
          <span className=" font-bold">{userName}</span>
        </div>
      </Link>
      {/* Posted Image */}
      <div className="w-full">
        <img className="w-full h-full overflow-hidden" src={postUrl} alt="" />
      </div>
      {/* Responses */}
      <div className="w-full">
        <Engagments
          postInfo={{
            userId,
            userName,
            profilePic,
            postId,
            postUrl,
            likeCount,
            caption,
          }}
        ></Engagments>
      </div>
    </div>
  );
}

export default Post;
