// import React from 'react'
import instaIcon from "../assets/InstagramIcon.svg";
import { VscAccount } from "react-icons/vsc";
import HomeIcon from "../assets/HomeIcon.png";
import CreateIcon from "../assets/CreateIcon.png";
import instaLogoType from "../assets/insta logo.png";

function SideBar() {
  return (
    // Container
    <div className="  flex flex-col gap-10 items-center lg:items-start  h-screen w-[72px] lg:w-[244px] lg:pl-3 border-r-2  border-s-slate-100 bg-white ">
      {/* insta icon */}
      <div className="mt-5  cursor-pointer">
        <span className="w-6 h-6 lg:hidden">
          <img src={instaIcon} alt="" />
        </span>
        <span className=" lg:block md:hidden">
          <img src={instaLogoType} alt="" />
        </span>
      </div>

      {/* nav */}
      <div className="">
        <ul className=" flex flex-col  gap-5 justify-evenly items-center w-full bg-white">
          <li className="flex gap-2 justify-center items-center cursor-pointer">
            <span className="w-6 h-6 ">
              <img src={HomeIcon} alt="" />
            </span>
            <span className=" font-bold text-lg lg:block md:hidden">Home</span>
          </li>
          <li
            className="flex gap-2 justify-center items-center cursor-pointer"
            id="create"
          >
            <span className="w-6 h-6 ">
              <img src={CreateIcon} alt="" />
            </span>
            <span className=" font-bold text-lg lg:block md:hidden">
              Create
            </span>
          </li>
          <li
            className="flex gap-2 justify-center items-center cursor-pointer"
            id="profile"
          >
            <span>
              <VscAccount className="w-6 h-6" />
            </span>
            <span className=" font-bold  text-lg lg:block md:hidden">
              Profile
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
