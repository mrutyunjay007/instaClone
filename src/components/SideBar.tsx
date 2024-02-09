// import { useState } from "react";
import instaIcon from "../assets/InstagramIcon.svg";

import instaLogoType from "../assets/insta logo.png";
import Nav from "./Nav";

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
        <Nav></Nav>
      </div>
    </div>
  );
}

export default SideBar;
