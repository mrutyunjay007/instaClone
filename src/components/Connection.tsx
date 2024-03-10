// import React from 'react'
import { VscAccount } from "react-icons/vsc";
import { IConnection } from "../Redux/Slice/FollowSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import { useState } from "react";
import { profileService } from "../Firebase/profileService";
import { upDateUserFollowingCount } from "../Redux/Slice/UserSlice";
import { addOthersinfo } from "../Redux/Slice/OthersSlice";
import { Link } from "react-router-dom";

function Connection({
  followersData: { userId, userName, isFollowing },
  likeCount,
}: {
  followersData: IConnection;
  likeCount: number | null;
}) {
  const authUserId = useSelector(
    (state: RootState) => state.UserInfos.userData.userId
  );
  const authUserFollowingNum = useSelector(
    (state: RootState) => state.UserInfos.userData.following
  );

  const dispatch = useDispatch();

  const [isFollowingStatus, setIsFollowingStatus] = useState(isFollowing);

  return (
    <div className="flex mt-3 p-5 justify-between drop-shadow-lg bg-white items-center px-4">
      <Link to="/othersProfile">
        <div
          className="flex-1 flex justify-start items-center gap-3 my-4 cursor-pointer"
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
          <div className=" dark:text-color">
            <VscAccount className="w-8 h-8"></VscAccount>{" "}
          </div>

          <div className=" text-lg font-bold dark:text-color">
            <span>{userName}</span>
          </div>
        </div>
      </Link>

      {/* follow un-follow btn */}
      <div
        className={` flex justify-center items-center w-32 h-12 ${
          likeCount ? "hidden" : "block"
        } ${
          !isFollowingStatus
            ? " bg-[#0095f6]"
            : "bg-white border-2  border-slate-300"
        }  rounded-md p-2 text-lg font-bold cursor-pointer`}
        onClick={() => {
          profileService.upDateFollowingFromFollowList({
            userId,
            authUserId,
            followingStatus: !isFollowingStatus,
          });
          profileService.updateFollowingCount({
            userId,
            authUserId,
            authUserFollowingNum,
            followingStatus: !isFollowingStatus,
          });
          dispatch(
            upDateUserFollowingCount({ followingStatus: !isFollowingStatus })
          );
          setIsFollowingStatus(!isFollowingStatus);
        }}
      >
        <span
          className={`${
            !isFollowingStatus ? "text-white" : "text-slate-400"
          }  `}
        >
          {isFollowingStatus ? "Following..." : "Follow"}
        </span>
      </div>
    </div>
  );
}

export default Connection;
