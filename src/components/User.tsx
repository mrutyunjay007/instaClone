import Gallary from "./Gallary";
import { IUser, upDateUserFollowingCount } from "../Redux/Slice/UserSlice";
import { Link } from "react-router-dom";
// import { RootState } from "../Redux/store";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../Redux/Slice/CurrentUserSlice";
import { profileService } from "../Firebase/profileService";
import { RootState } from "../Redux/store";
import { useEffect, useState } from "react";
import { upDateOthersFollowingCount } from "../Redux/Slice/OthersSlice";
import BackBtn from "./SmallComponents/BackBtn";
import GridIcon from "../assets/Grid.svg";
import GridActIcon from "../assets/GridAct.svg";
import SavedIcon from "../assets/savedPosts.svg";
import { postService } from "../Firebase/postService";
import SaveIcon from "./SmallComponents/Icons/SaveIcon/SaveIcon";
import Spiner from "./SmallComponents/loaders/Spiner";

import { FiEdit2 } from "react-icons/fi";
import TopRightSetOfComponents from "./SmallComponents/TopRightSetOfComponents";
import ProfilePic from "./SmallComponents/ProfilePic";

function User({
  userData,
  userProfile,
}: {
  userData: IUser;
  userProfile: boolean;
}) {
  const [isInFollowList, setIsInFollowList] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false); //followed by me or not
  const [isFollowLoader, setIsFollowLoader] = useState(true);

  const authUser = useSelector((state: RootState) => state.UserInfos.userData);
  const dispatch = useDispatch();

  const [posts, setPosts] = useState<{ postId: string; postUrl: string }[]>([]);
  const [savedPosts, setSavedPosts] = useState<
    { postId: string; postUrl: string }[]
  >([]);

  const [isGrid, setGrid] = useState(true);
  const [isSaved, setSaved] = useState(false);

  // other-user follow to current-user or not
  useEffect(() => {
    authUser.userId != userData.userId &&
      (async (userId, authUserId) => {
        try {
          const inFollowList = await profileService.isInFollowList({
            userId,
            authUserId,
          });
          console.log(inFollowList);

          if (inFollowList) {
            //me followed by other
            inFollowList.following && setIsInFollowList(true);
            //other followed by me
            inFollowList.follower && setIsFollowing(true);
            setIsFollowLoader(false);
          }
        } catch (error) {
          console.log(error);
        }
      })(userData.userId, authUser.userId);
  }, []);

  // Get users's uploaded posts to show in user-profile-gallary
  useEffect(() => {
    (async () => {
      const postList = await profileService.getUploadedPosts({
        userId: userData.userId,
      });

      if (postList) {
        setPosts([...postList]);
      }
    })();
  }, []);

  const handelFollowingSatus = () => {
    if (!isInFollowList) {
      profileService.upDateFollowingFromProfile({
        authUserData: {
          userId: authUser.userId,
          userName: authUser.userName,
          profilePic: authUser.profilePic,
          follower: false,
          following: !isFollowing,
        },
        userData: {
          userId: userData.userId,
          userName: userData.userName,
          profilePic: userData.profilePic,
          follower: !isFollowing,
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
    }
    profileService.updateFollowingCount({
      userId: userData.userId,
      authUserId: authUser.userId,
      authUserFollowingNum: authUser.following,
      followingStatus: !isFollowing,
    });
    dispatch(upDateUserFollowingCount({ followingStatus: !isFollowing }));
    dispatch(upDateOthersFollowingCount({ followerStatus: !isFollowing }));
    setIsFollowing(!isFollowing);
  };

  return (
    <>
      {/* TopBar */}

      {/* Body */}
      <div className=" md:mt-5 md:px-5 md:pb-0 pb-[5.1rem]  w-full lg:w-[800px]">
        <div className="md:flex justify-evenly items-center ">
          <div className=" w-48 h-48 dark:text-color hidden md:block">
            <ProfilePic
              url={userData.profilePic}
              w={"full"}
              h={"full"}
            ></ProfilePic>
          </div>
          <div>
            {/* User Name */}
            <div className="  dark:bg-background sticky top-0 flex justify-between items-center w-full h-[5.1rem] bg-white border-b-2 border-s-slate-100 md:border-none">
              <span className=" flex ml-2 justify-center items-center dark:text-color  gap-3 font-bold text-2xl  md:font-normal">
                {!userProfile && <BackBtn></BackBtn>}
                <span>{userData.userName}</span>
              </span>
              <span className="flex gap-3">
                <Link to={"/edit"}>
                  <FiEdit2
                    className={`${
                      userProfile ? "block" : "hidden"
                    } size-6 cursor-pointer`}
                  />
                </Link>

                <TopRightSetOfComponents></TopRightSetOfComponents>
              </span>
            </div>
            {/* profile componenet */}
            <div className="flex flex-col w-full">
              {/* Top section */}

              {/* profile info */}
              <div className="flex w-full p-5 gap-3 md:gap-0">
                {/* Left side */}

                {/* user pic & name */}
                <div className="w-20 h-20  flex flex-col justify-start items-center md:hidden">
                  <ProfilePic
                    url={userData.profilePic}
                    w={"full"}
                    h={"full"}
                  ></ProfilePic>
                  <span className="text-sm  text-slate-500">
                    {" "}
                    {`@ ${userData.userIdName}`}
                  </span>
                </div>

                {/* right side */}

                {/* follow and post Nums */}
                <div className=" dark:text-color flex-1 flex justify-evenly md:justify-between gap-3 items-center ">
                  <div className=" flex flex-col md:flex-row  md:gap-1 items-center">
                    <span className="font-bold text-lg md:text-xl">
                      {userData.postNumber}
                    </span>
                    <span className=" font-normal text-base md:text-lg">
                      posts
                    </span>
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
                      <span className="font-bold  text-lg md:text-xl">
                        {userData.follower}
                      </span>
                      <span className=" font-normal text-base md:text-lg">
                        follower
                      </span>
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
                      <span className="font-bold md:text-xl  text-lg">
                        {userData.following}
                      </span>
                      <span className=" font-normal text-base md:text-lg">
                        following
                      </span>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Down section */}

              {/* Bio */}
              <div className="w-full whitespace-pre-line font-bold px-4 ">
                {userData.userBio}
              </div>
            </div>

            {/* Follow Button */}
            <div
              className={`px-3 ${userProfile ? "hidden" : "block"}`}
              onClick={handelFollowingSatus}
            >
              <div
                className={` flex justify-center rounded-md items-center p-5 mt-4 w-full h-8 bg-[#0095f6]  cursor-pointer ${
                  isFollowing
                    ? "bg-white border-2 border-slate-400"
                    : "border-2 border-[#0095f6] "
                }`}
              >
                {isFollowLoader ? (
                  <Spiner w={8} h={8}></Spiner>
                ) : (
                  <span
                    className={`flex justify-center items-center h-full w-[90%] rounded-[10px]  ${
                      !isFollowing ? " text-white" : "text-black"
                    } font-bold`}
                  >
                    {isFollowing ? "Following" : "Follow"}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Galary Gride */}
        <div className="galary">
          <div className="w-full h-[44px] mt-2 border-b border-s-slate-200 ">
            {/* Activated */}
            <div className="w-full relative h-1">
              <div
                className={`w-1/2 h-1/2 bg-slate-500 absolute ${
                  isGrid ? "left-0" : "right-0"
                }`}
              ></div>
            </div>

            {/* Icons */}
            <div className="flex justify-around pt-1 items-center w-full">
              {/* grid Icon */}
              <span
                className=" cursor-pointer"
                onClick={() => {
                  setGrid(true);
                  setSaved(false);
                }}
              >
                {!isGrid ? (
                  <img src={GridIcon} alt="" />
                ) : (
                  <img src={GridActIcon} alt="" />
                )}
              </span>

              {/* saved Icon */}
              <span
                className=" cursor-pointer"
                onClick={() => {
                  (async () => {
                    const saved = await postService.getAllSavedPosts({
                      userId: userData.userId,
                    });

                    if (saved) {
                      setSavedPosts([...saved]);
                    }
                  })();

                  setGrid(false);
                  setSaved(true);
                }}
              >
                {!isSaved ? (
                  <SaveIcon></SaveIcon>
                ) : (
                  <img src={SavedIcon} alt="" />
                )}
              </span>
            </div>
          </div>
          <Gallary
            post={{
              postList: isGrid ? [...posts] : [...savedPosts],
            }}
          ></Gallary>
        </div>
      </div>
    </>
  );
}

export default User;
