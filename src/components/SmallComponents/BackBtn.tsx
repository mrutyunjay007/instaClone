// import React from 'react'
import { useNavigate } from "react-router-dom";
import { RiArrowLeftSLine } from "react-icons/ri";
// import DarkModeIconConverter from "./Icons/DarkModeIconConverter";
// import backDark from "../../assets/backIcon.png";
// import backLight from "../../assets/backWhite.png";
// // import BackIcon from "../../assets/Back.png";
function BackBtn() {
  const navigate = useNavigate();
  return (
    <RiArrowLeftSLine
      className="size-7 cursor-pointer dark:text-white"
      onClick={() => {
        navigate(-1);
      }}
    />
  );
}

export default BackBtn;
