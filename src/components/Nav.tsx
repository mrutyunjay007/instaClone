import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { RiSearchLine } from "react-icons/ri";
import { RiHeart3Fill } from "react-icons/ri";
import { RiSearchFill } from "react-icons/ri";
import { RootState } from "../Redux/store";
import {
  AtHome,
  CheckingNotifications,
  CreatingPost,
  InProfile,
  Searching,
} from "../Redux/Slice/NavSlice";
import HomeIcon from "./SmallComponents/Icons/HomeIcon/HomeIcon";
import HomeActIcon from "./SmallComponents/Icons/HomeIcon/HomeActIcon";
import CreatePostIcon from "./SmallComponents/Icons/CreatePostIcon/CreatePostIcon";
import CreatePostActIcon from "./SmallComponents/Icons/CreatePostIcon/CreatePostActIcon";
import NotifiactionBell from "./SmallComponents/NotifiactionBell";
import ToggleBtn from "./SmallComponents/ToggleBtn";
import ProfilePic from "./SmallComponents/ProfilePic";

function Nav() {
  const {
    isAtHome,
    isCreatingPost,
    isInProfile,
    isInNotification,
    isSearching,
  } = useSelector((state: RootState) => state.Navigation);
  const dispatch = useDispatch();
  return (
    <ul className=" flex md:flex-col dark:bg-background dark:text-color md:gap-10 justify-evenly md:items-center lg:pl-3 lg:items-start w-full bg-white">
      {/* Home */}
      <Link to="/">
        <li
          className="flex gap-2 justify-center items-center cursor-pointer"
          onClick={() => {
            !isAtHome && dispatch(AtHome());
          }}
        >
          {!isAtHome ? (
            <span className="w-6 h-6 ">
              <HomeIcon></HomeIcon>
            </span>
          ) : (
            <span className="w-6 h-6 ">
              <HomeActIcon></HomeActIcon>
            </span>
          )}
          <span
            className={` ${
              isAtHome ? "font-bold" : "font-normal"
            }  text-lg lg:block  hidden`}
          >
            Home
          </span>
        </li>
      </Link>

      {/* crete new post */}
      <Link to="/upLoadPost">
        <li
          className="flex gap-2 justify-center items-center cursor-pointer"
          onClick={() => {
            !isCreatingPost && dispatch(CreatingPost());
          }}
        >
          {!isCreatingPost ? (
            <span className="w-6 h-6 ">
              <CreatePostIcon></CreatePostIcon>
            </span>
          ) : (
            <span className="w-6 h-6 ">
              <CreatePostActIcon></CreatePostActIcon>
            </span>
          )}
          <span
            className={` ${
              isCreatingPost ? "font-bold" : "font-normal"
            }  text-lg lg:block  hidden`}
          >
            Create
          </span>
        </li>
      </Link>

      {/* Search */}
      <Link to="/search" className="hidden md:block">
        <li
          className="flex gap-2 justify-center items-center cursor-pointer"
          onClick={() => {
            !isSearching && dispatch(Searching());
          }}
        >
          {!isSearching ? (
            <span>
              <RiSearchLine className="size-6 dark:text-white cursor-pointer"></RiSearchLine>
            </span>
          ) : (
            <span>
              <RiSearchFill className="size-6 dark:text-white cursor-pointer" />
            </span>
          )}
          <span
            className={` ${
              isSearching ? "font-bold" : "font-normal"
            }  text-lg lg:block  hidden`}
          >
            Search
          </span>
        </li>
      </Link>

      {/* Notification */}
      <Link to="/notification" className="hidden md:block">
        <li
          className="flex gap-2 justify-center items-center cursor-pointer"
          onClick={() => {
            !isInNotification && dispatch(CheckingNotifications());
          }}
        >
          {!isInNotification ? (
            <span>
              <NotifiactionBell></NotifiactionBell>
            </span>
          ) : (
            <span>
              <RiHeart3Fill className="size-6 dark:text-white" />
            </span>
          )}
          <span
            className={` ${
              isInNotification ? "font-bold" : "font-normal"
            }  text-lg lg:block  hidden`}
          >
            Notification
          </span>
        </li>
      </Link>

      {/* Dark Mode  */}
      <li className="hidden md:flex gap-2 justify-center items-center cursor-pointer">
        <span>
          <ToggleBtn></ToggleBtn>
        </span>
      </li>

      {/* profile */}
      <Link to="/userProfile">
        <li
          className="flex gap-2 justify-center items-center cursor-pointer"
          onClick={() => {
            !isInProfile && dispatch(InProfile());
          }}
        >
          {!isInProfile ? (
            <span>
              <ProfilePic w={6} h={6}></ProfilePic>
            </span>
          ) : (
            <span className="border-2  rounded-full border-black">
              <ProfilePic w={6} h={6}></ProfilePic>
            </span>
          )}
          <span
            className={` ${
              isInProfile ? "font-bold" : "font-normal"
            }  text-lg lg:block  hidden`}
          >
            Profile
          </span>
        </li>
      </Link>
    </ul>
  );
}

export default Nav;
