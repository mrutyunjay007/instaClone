// import React from 'react'
import { useNavigate } from "react-router-dom";
import DarkModeIconConverter from "./Icons/DarkModeIconConverter";
import backDark from "../../assets/backIcon.png";
import backLight from "../../assets/backWhite.png";
// import BackIcon from "../../assets/Back.png";
function BackBtn() {
  const navigate = useNavigate();
  return (
    <span
      className=" md:left-[80px] lg:left-[250px] cursor-pointer pl-2"
      onClick={() => {
        navigate(-1);
      }}
    >
      <DarkModeIconConverter
        dark={backDark}
        light={backLight}
      ></DarkModeIconConverter>
    </span>
  );
}

export default BackBtn;
