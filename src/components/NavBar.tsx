// import React from 'react'
import instaLogoType from "../assets/insta logo.png";
import { VscSearch } from "react-icons/vsc";

function NavBar() {
  return (
    <div className="flex justify-between items-center w-screen h-[9vh] bg-white border-b-2 border-s-slate-100 mt-1">
      <div className="ml-4">
        <span className=" h-6 w-6 ">
          <img src={instaLogoType} alt="" />
        </span>
      </div>

      <div className=" mr-4">
        <span className=" h-6 w-4 ">
          <VscSearch></VscSearch>
        </span>
      </div>
    </div>
  );
}

export default NavBar;
