// import React from 'react'
import { useNavigate } from "react-router-dom";
import BackIcon from "../../assets/Back.png";
function BackBtn() {
  const navigate = useNavigate();
  return (
    <span
      className=" absolute md:left-[80px] lg:left-[250px] cursor-pointer pl-2"
      onClick={() => {
        navigate(-1);
      }}
    >
      <img src={BackIcon} alt="" />
    </span>
  );
}

export default BackBtn;
