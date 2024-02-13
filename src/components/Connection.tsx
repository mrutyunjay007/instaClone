// import React from 'react'
import { VscAccount } from "react-icons/vsc";
import { IConnection } from "../Redux/Slice/FollowSlice";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import { useState } from "react";
import { profileService } from "../Firebase/profileService";

function Connection({
  followersData: { userId, userName, profilePic, isFollower, isFollowing },
}: {
  followersData: IConnection;
}) {
  const authUserId = useSelector(
    (state: RootState) => state.UserInfos.userData.userId
  );

  const [isFollowingStatus, setIsFollowingStatus] = useState(isFollowing);

  return (
    <div className="flex justify-between items-center px-4">
      <div className="flex-1 flex justify-start items-center gap-3 my-4 cursor-pointer">
        <div className="">
          <VscAccount className="w-8 h-8"></VscAccount>{" "}
        </div>

        <div className=" text-lg font-bold">
          <span>{userName}</span>
        </div>
      </div>

      <div
        className=" flex justify-center items-center basis-1/4  bg-[#0095f6]  rounded-md p-2 text-lg font-bold cursor-pointer"
        onClick={() => {
          profileService.upDateFollowingFromFollowList({
            userId,
            authUserId,
            followingStatus: !isFollowingStatus,
          });
          setIsFollowingStatus(!isFollowingStatus);
        }}
      >
        <span className=" text-white ">
          {isFollowingStatus ? "Following..." : "Follow"}
        </span>
      </div>
    </div>
  );
}

export default Connection;
