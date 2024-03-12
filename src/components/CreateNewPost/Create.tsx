// import React from 'react'
import { useRef } from "react";
import { setSelectedPost } from "../../Redux/Slice/CreatePostSlice";
import uploadIcon from "../../assets/Icon to represent media such as images or videos.png";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
function Create() {
  const inputref = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="w-full">
      {/* nav */}
      <div className="w-full sticky h-[9vh] flex justify-center items-center border-b-2 border-s-slate-100">
        <span className="  dark:text-color font-bold text-2xl cursor-pointer">
          Create New Post
        </span>
      </div>

      {/* post */}
      <div className="flex justify-center ">
        <div className=" flex flex-col md:w-1/2 lg:w-1/2 h-[91vh] items-center justify-center   ">
          <span>
            <img src={uploadIcon} alt="" />
          </span>

          {/* select post-image */}
          <span
            className="mt-2  bg-[#0095f6] text-white font-semibold p-3 rounded-lg cursor-pointer "
            onClick={() => {
              inputref.current?.click();
            }}
          >
            <input
              type="file"
              ref={inputref}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const post = e.target.files;
                if (post != null) {
                  const postUrl = URL.createObjectURL(post[0]);
                  const postMetaData = post[0];
                  dispatch(setSelectedPost({ postUrl, postMetaData }));
                  navigate("/sharePost");
                }
              }}
              className="hidden"
            />
            select from device
          </span>
        </div>
      </div>
    </div>
  );
}

export default Create;
