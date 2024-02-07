// import React from 'react'
// import { VscBookmark } from "react-icons/vsc";
// import { VscHeart } from "react-icons/vsc";

import CommentIcon from "../assets/Comment.png";
import LikeIcon from "../assets/Like.png";
import SaveIcon from "../assets/Save.png";
function Engagments() {
  return (
    <div className="flex flex-col gap-2 mt-1 pb-4 ml-2">
      {/* like comment save */}
      <ul className="flex  items-center gap-4 ">
        <li>
          <img src={LikeIcon} alt="" />
          {/* <VscHeart></VscHeart> */}
        </li>
        <li>
          <img src={CommentIcon} alt="" />
        </li>
        <li>
          <img src={SaveIcon} alt="" />
          {/* <VscBookmark></VscBookmark> */}
        </li>
      </ul>
      {/* caption */}
      <div className="flex  items-center gap-2 mt-2 mb-1">
        <div className=" font-bold">userName</div>
        <div>caption </div>
      </div>
    </div>
  );
}

export default Engagments;
