// import { useState } from "react";
import instaIcon from "../assets/InstagramIcon.svg";
import { Link } from "react-router-dom";
import instaLogoType from "../assets/insta logo.png";
import { RootState } from "../Redux/store";
import { useSelector, useDispatch } from "react-redux";
import Nav from "./Nav";
import { AtHome } from "../Redux/Slice/NavSlice";

function SideBar() {
  const { isAtHome } = useSelector((state: RootState) => state.Navigation);
  const dispatch = useDispatch();
  return (
    // Container
    <div className="  flex flex-col gap-10 items-center lg:items-start  h-screen w-[72px] lg:w-[244px] lg:pl-3 border-r-2  border-s-slate-100 bg-white ">
      {/* insta icon */}
      <Link to="/">
        <div
          className="mt-5  cursor-pointer"
          onClick={() => {
            !isAtHome && dispatch(AtHome());
          }}
        >
          <span className="w-6 h-6 lg:hidden">
            <img src={instaIcon} alt="" />
          </span>
          <span className=" lg:block md:hidden">
            <img src={instaLogoType} alt="" />
          </span>
        </div>
      </Link>

      {/* nav */}
      <div className="">
        <Nav></Nav>
      </div>
    </div>
  );
}

export default SideBar;
