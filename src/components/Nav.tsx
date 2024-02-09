import { useState } from "react";
import { Link } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";
import { FaUserCircle } from "react-icons/fa";
import HomeIcon from "../assets/HomeIcon.png";
import HomeActIcon from "../assets/HomeActIcon.png";
import CreateIcon from "../assets/CreateIcon.png";
import CreateActIcon from "../assets/createActIcon.png";

function Nav() {
  const [isAtHome, setIsAtHome] = useState<boolean>(true);
  const [isCreatingPost, setIsCreatingPost] = useState<boolean>(false);
  const [isInProfile, setIsInProfile] = useState<boolean>(false);
  return (
    <ul className=" flex md:flex-col  md:gap-5 justify-evenly items-center w-full bg-white">
      {/* Home */}
      <Link to="/">
        <li
          className="flex gap-2 justify-center items-center cursor-pointer"
          onClick={() => {
            if (!isAtHome) {
              setIsAtHome(true);
              setIsCreatingPost(false);
              setIsInProfile(false);
            }
          }}
        >
          {!isAtHome ? (
            <span className="w-6 h-6 ">
              <img src={HomeIcon} alt="" />
            </span>
          ) : (
            <span className="w-6 h-6 ">
              <img src={HomeActIcon} alt="" />
            </span>
          )}
          <span className=" font-bold text-lg lg:block hidden">Home</span>
        </li>
      </Link>

      {/* crete new post */}
      <Link to="/createPost">
        <li
          className="flex gap-2 justify-center items-center cursor-pointer"
          onClick={() => {
            if (!isCreatingPost) {
              setIsCreatingPost(true);
              setIsAtHome(false);
              setIsInProfile(false);
            }
          }}
        >
          {!isCreatingPost ? (
            <span className="w-6 h-6 ">
              <img src={CreateIcon} alt="" />
            </span>
          ) : (
            <span className="w-6 h-6 ">
              <img src={CreateActIcon} alt="" />
            </span>
          )}
          <span className=" font-bold text-lg lg:block hidden">Create</span>
        </li>
      </Link>

      {/* profile */}
      <Link to="/myProfile">
        <li
          className="flex gap-2 justify-center items-center cursor-pointer"
          onClick={() => {
            if (!isInProfile) {
              setIsInProfile(true);
              setIsAtHome(false);
              setIsCreatingPost(false);
            }
          }}
        >
          {!isInProfile ? (
            <span>
              <VscAccount className="w-6 h-6" />
            </span>
          ) : (
            <span>
              <FaUserCircle className="w-6 h-6" />
            </span>
          )}
          <span className=" font-bold  text-lg lg:block  hidden">Profile</span>
        </li>
      </Link>
    </ul>
  );
}

export default Nav;
