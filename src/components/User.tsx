// import React from 'react'
import { VscAccount } from "react-icons/vsc";
import Gallary from "./Gallary";
import { IUser } from "../Redux/Slice/UserSlice";
import { Link } from "react-router-dom";
// import { RootState } from "../Redux/store";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../Redux/Slice/CurrentUserSlice";
import { profileService } from "../Firebase/profileService";
import { RootState } from "../Redux/store";
import { useEffect, useState } from "react";

function User({
  userData,
  userProfile,
}: {
  userData: IUser;
  userProfile: boolean;
}) {
  //Todo
  const [isInFollowList, setIsInFollowList] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false); //followed by me or not

  const authUser = useSelector((state: RootState) => state.UserInfos.userData);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(isFollowing);
    console.log(userData.userId);

    (async (userId, authUserId) => {
      // try {
      const inFollowList = await profileService.isInFollowList({
        userId,
        authUserId,
      });

      if (inFollowList) {
        setIsInFollowList(true);
        inFollowList.following && setIsFollowing(true);
      }
      // } catch (error) {
      //   console.log(error);
      // }
    })(userData.userId, authUser.userId);
  }, []);

  const handelFollowingSatus = () => {
    if (!isInFollowList) {
      profileService.upDateFollowingFromProfile({
        authUserData: {
          userId: authUser.userId,
          userName: authUser.userName,
          profilePic: authUser.profilePic,
          follow: false,
          following: !isFollowing,
        },
        userData: {
          userId: userData.userId,
          userName: userData.userName,
          profilePic: userData.profilePic,
          follow: !isFollowing,
          following: false,
        },
      });
      setIsInFollowList(true);
    } else {
      profileService.upDateFollowingFromFollowList({
        userId: userData.userId,
        authUserId: authUser.userId,
        followingStatus: !isFollowing,
      });
      console.log("hi");
    }
    setIsFollowing(!isFollowing);
  };

  return (
    <div className=" md:mt-5 md:w-3/4  lg:w-1/2">
      <div className="md:flex justify-evenly items-center ">
        <div className="hidden md:block">
          <VscAccount className="w-[150px] h-[150px]"></VscAccount>
        </div>
        <div>
          {/* User Name */}
          <div className=" sticky top-0 flex justify-start items-center w-full h-[9vh] bg-white border-b-2 border-s-slate-100 md:border-none">
            <span className=" font-bold text-2xl ml-2  md:font-normal">
              {userData.userName}
            </span>
          </div>
          {/* profile componenet */}
          <div className="flex flex-col w-full">
            {/* Top section */}

            {/* profile info */}
            <div className="flex w-full p-5 gap-6 md:gap-0">
              {/* Left side */}

              {/* user pic & name */}
              <div className="  flex justify-start items-center md:hidden">
                <VscAccount className="w-[77px] h-[77px]" />
                {/* <img className=" rounded w-[77px] h-[77px]" src="" alt="" /> */}
              </div>

              {/* right side */}

              {/* follow ans post Nums */}
              <div className="flex-1 flex justify-evenly md:justify-between md:gap-3 lg:gap-3 items-center ">
                <div className=" flex flex-col md:flex-row md:gap-1 items-center">
                  <span className="font-bold  text-xl">{100}</span>
                  <span className=" font-normal text-lg">Posts</span>
                </div>

                <Link to="/followers">
                  <div
                    className=" flex flex-col md:flex-row md:gap-1 items-center cursor-pointer"
                    onClick={() => {
                      dispatch(
                        setCurrentUser({
                          userId: userData.userId,
                          userName: userData.userName,
                        })
                      );
                    }}
                  >
                    <span className="font-bold  text-xl">
                      {userData.follower}
                    </span>
                    <span className=" font-normal text-lg">Follower</span>
                  </div>
                </Link>

                <Link to="/following">
                  <div
                    className="flex flex-col md:flex-row md:gap-1 items-center cursor-pointer"
                    onClick={() => {
                      dispatch(
                        setCurrentUser({
                          userId: userData.userId,
                          userName: userData.userName,
                        })
                      );
                    }}
                  >
                    <span className="font-bold  text-xl">
                      {userData.following}
                    </span>
                    <span className=" font-normal text-lg">Following</span>
                  </div>
                </Link>
              </div>
            </div>

            {/* Down section */}

            {/* Bio */}
            <div className="w-full  px-4">{userData.userBio}</div>
          </div>

          {/* Follow Button */}
          <div
            className={`px-3 ${userProfile ? "hidden" : "block"}`}
            onClick={handelFollowingSatus}
          >
            <div className=" flex justify-center rounded-md items-center p-5 mt-4 w-full h-8 bg-[#0095f6]  cursor-pointer">
              <span className="flex justify-center items-center h-full w-[90%] rounded-[10px]  text-white font-bold">
                {isFollowing ? "Following" : "Follow"}
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Galary Gride */}
      <div className="galary">
        <Gallary></Gallary>
      </div>
    </div>
  );
}

export default User;
