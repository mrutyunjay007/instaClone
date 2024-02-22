// import { useState } from "react";
// import {useCustomDispatch} from '../Redux/Store'
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";
import { FaUserCircle } from "react-icons/fa";
import HomeIcon from "../assets/HomeIcon.png";
import HomeActIcon from "../assets/HomeActIcon.png";
import CreateIcon from "../assets/CreateIcon.png";
import CreateActIcon from "../assets/createActIcon.png";
import { RootState } from "../Redux/store";
import { AtHome, CreatingPost, InProfile } from "../Redux/Slice/NavSlice";

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
      <Link to="/upLoadPost">
        <li
          className="flex gap-2 justify-center items-center cursor-pointer"
          onClick={() => {
            !isCreatingPost && dispatch(CreatingPost());
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
      <Link to="/userProfile">
        <li
          className="flex gap-2 justify-center items-center cursor-pointer"
          onClick={() => {
            !isInProfile && dispatch(InProfile());
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
