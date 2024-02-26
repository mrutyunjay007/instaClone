// import React from 'react'
import { VscAccount } from "react-icons/vsc";
import Engagments from "./Engagments";
// import post from "../assets/js-mock-up.png.png";
import { IPost } from "../Redux/Slice/CurrentPostSlice";
import { profileService } from "../Firebase/profileService";
import { useDispatch, useSelector } from "react-redux";
import { addOthersinfo } from "../Redux/Slice/OthersSlice";
import { Link } from "react-router-dom";
import { RootState } from "../Redux/store";
// import { useState } from "react";
import Image from "./SmallComponents/Image";

function Post({
  posts: { postId, userId, userName, profilePic, postUrl, caption, likeCount },
}: {
  posts: IPost;
}) {
  // const [imageLoaded, setImageLoaded] = useState(false);
  // console.log(imageLoaded);

  const authUserId = useSelector(
    (state: RootState) => state.UserInfos.userData.userId
  );
  const dispatch = useDispatch();

  return (
    <div className=" dark:bg-background flex flex-col w-full md:w-[468px] gap-2 mt-2 bg-white mb-4 border-b-2 border-s-slate-100 ">
      {/* User Info */}

      <Link to={userId == authUserId ? "/userProfile" : "/othersProfile"}>
        <div
          className="flex w-full justify-start items-center gap-2 cursor-pointer"
          onClick={async () => {
            try {
              if (userId != authUserId) {
                const otherUserInfo = await profileService.otherUserProfile({
                  userId,
                });
                if (otherUserInfo) {
                  dispatch(addOthersinfo({ ...otherUserInfo }));
                }
              }
            } catch (error) {
              console.log(error);
            }
          }}
        >
          <span className="ml-2 dark:text-color">
            <VscAccount className="w-8 h-8" />
          </span>
          <span className="dark:text-color  font-bold">{userName}</span>
        </div>
      </Link>
      {/* Posted Image */}
      <div className="w-full aspect-square">
        <Image url={postUrl}></Image>
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
