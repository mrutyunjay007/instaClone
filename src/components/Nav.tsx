import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";
import { FaUserCircle } from "react-icons/fa";

import { RootState } from "../Redux/store";
import { AtHome, CreatingPost, InProfile } from "../Redux/Slice/NavSlice";
import HomeIcon from "./SmallComponents/Icons/HomeIcon/HomeIcon";
import HomeActIcon from "./SmallComponents/Icons/HomeIcon/HomeActIcon";
import CreatePostIcon from "./SmallComponents/Icons/CreatePostIcon/CreatePostIcon";
import CreatePostActIcon from "./SmallComponents/Icons/CreatePostIcon/CreatePostActIcon";

function Nav() {
  const { isAtHome, isCreatingPost, isInProfile } = useSelector(
    (state: RootState) => state.Navigation
  );
  const dispatch = useDispatch();
  return (
    <ul className=" flex md:flex-col dark:bg-background md:gap-5 justify-evenly items-center w-full bg-white">
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
          <span className=" font-bold text-lg lg:block hidden">Home</span>
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
          <span className=" font-bold text-lg lg:block hidden">Create</span>
        </li>
      </Link>

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
              <VscAccount className="w-6 h-6 dark:text-color" />
            </span>
          ) : (
            <span>
              <FaUserCircle className="w-6 h-6 dark:text-color" />
            </span>
          )}
          <span className=" font-bold  text-lg lg:block  hidden">Profile</span>
        </li>
      </Link>
    </ul>
  );
}

export default Nav;
