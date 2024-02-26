// import React from 'react'

import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setPostId } from "../Redux/Slice/CurrentGallaryPostSlice";
import Image from "./SmallComponents/Image";

function Gallary({
  post: { postList },
}: {
  post: {
    postList: { postId: string; postUrl: string }[];
  };
}) {
  const dispatch = useDispatch();

  return (
    <div>
      {/* ========= all Posts of User ========== */}

      <div className=" w-full grid  grid-cols-3  auto-rows-fr gap-2 p-2">
        {postList.length == 0 ? (
          <div className=" bg-slate-300 ">
            <div className="w-full h-full aspect-square object-cover " />
          </div>
        ) : (
          postList.map((post) => (
            <Link to="/singlePost" key={post.postId}>
              <div
                className=" cursor-pointer "
                onClick={() => {
                  dispatch(setPostId({ postId: post.postId }));
                }}
              >
                {/* <img
                  className="w-full h-full  aspect-square object-cover "
                  src={post.postUrl}
                  alt=""
                /> */}
                <Image url={post.postUrl}></Image>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default Gallary;
