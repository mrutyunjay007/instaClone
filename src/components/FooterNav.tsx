// import React from 'react'
import { VscAccount } from "react-icons/vsc";
import HomeIcon from "../assets/HomeIcon.png";
import CreateIcon from "../assets/CreateIcon.png";

function FooterNav() {
  return (
    <div className=" fixed flex justify-center items-center bg-white bottom-0 w-screen h-[9vh] border-t-2 border-s-slate-100">
      <ul className=" flex justify-evenly items-center w-full bg-white">
        <li className="w-6 h-6">
          <img src={HomeIcon} alt="" />
        </li>
        <li className="w-6 h-6">
          <img src={CreateIcon} alt="" />
        </li>
        <li className="w-6 h-6">
          <VscAccount className="w-6 h-6" />
        </li>
      </ul>
    </div>
  );
}

export default FooterNav;
