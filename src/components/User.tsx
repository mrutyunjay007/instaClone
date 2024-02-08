// import React from 'react'
import { VscAccount } from "react-icons/vsc";
import Gallary from "./Gallary";

function User() {
  return (
    <div className=" md:mt-5 md:w-3/4  lg:w-1/2">
      <div className="md:flex justify-evenly items-center ">
        <div className="hidden md:block">
          <VscAccount className="w-[150px] h-[150px]"></VscAccount>
        </div>
        <div>
          {/* User Name */}
          <div className=" sticky top-0 flex justify-start items-center w-full h-[9vh] bg-white border-b-2 border-s-slate-100 md:border-none">
            <span className=" font-bold text-2xl ml-2  md:font-normal">
              {" "}
              userName
            </span>
          </div>
          {/* profile componenet */}
          <div className="flex flex-col w-full">
            {/* Top section */}

            {/* profile info */}
            <div className="flex w-full p-5 gap-6 md:gap-0">
              {/* Left side */}

              {/* user pic & name */}
              <div className="  flex justify-start items-center md:hidden">
                <VscAccount className="w-[77px] h-[77px]" />
                {/* <img className=" rounded w-[77px] h-[77px]" src="" alt="" /> */}
              </div>

              {/* right side */}

              <div className="flex-1 flex justify-evenly md:justify-between md:gap-3 lg:gap-0 items-center ">
                <div className=" flex flex-col md:flex-row md:gap-1 items-center">
                  <span className="font-bold  text-xl">{100}</span>
                  <span className=" font-normal text-lg">Posts</span>
                </div>
                <div className=" flex flex-col md:flex-row md:gap-1 items-center">
                  <span className="font-bold  text-xl">{100}</span>
                  <span className=" font-normal text-lg">Follower</span>
                </div>

                <div className="flex flex-col md:flex-row md:gap-1 items-center">
                  <span className="font-bold  text-xl">{100}</span>
                  <span className=" font-normal text-lg">Following</span>
                </div>
              </div>
            </div>

            {/* Down section */}

            {/* Bio */}
            <div className="w-full  px-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perferendis
            </div>
          </div>

          {/* Follow Button */}
          <div className="px-3">
            <div className=" flex justify-center rounded-md items-center p-5 mt-4 w-full h-8 bg-[#0095f6]  cursor-pointer">
              <span className="flex justify-center items-center h-full w-[90%] rounded-[10px]  text-white font-bold">
                Follow
              </span>
            </div>
          </div>
          {/* Galary Gride */}
        </div>
      </div>
      <div className="galary">
        <Gallary></Gallary>
      </div>
    </div>
  );
}

export default User;
