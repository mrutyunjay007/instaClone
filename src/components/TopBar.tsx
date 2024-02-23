// import React from 'react'

import { VscSearch } from "react-icons/vsc";
import InstaTypoIcon from "./SmallComponents/Icons/InstaIcon/instaTypoIcon";

function NavBar() {
  return (
    <div className="flex justify-between items-center w-full h-[9vh] dark:bg-background bg-white border-b-2 border-s-slate-100">
      <div className="ml-4">
        <span className=" h-6 w-6 ">
          <InstaTypoIcon></InstaTypoIcon>
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
