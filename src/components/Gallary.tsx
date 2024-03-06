// import React from 'react'

import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setPostId } from "../Redux/Slice/CurrentGallaryPostSlice";
import Image from "./SmallComponents/Image";
import GallaryLoader from "./SmallComponents/loaders/GallaryLoader";

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
          <GallaryLoader></GallaryLoader>
        ) : (
          postList.map((post) => (
            <Link to="/singlePost" key={post.postId}>
              <div
                className=" cursor-pointer "
                onClick={() => {
                  dispatch(setPostId({ postId: post.postId }));
                }}
              >
                <Image url={post.postUrl} rounded={false}></Image>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default Gallary;
