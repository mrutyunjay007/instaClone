// import React from 'react'
import uploadIcon from "../../assets/Icon to represent media such as images or videos.png";

function Create() {
  return (
    <div className="w-full">
      {/* nav */}
      <div className="w-full sticky h-[9vh] flex justify-center items-center border-b-2 border-s-slate-100">
        <span className=" font-semibold">create new post</span>
      </div>

      {/* post */}
      <div className="flex justify-center ">
        <div className=" flex flex-col md:w-1/2 lg:w-1/2 h-[91vh] items-center justify-center   ">
          <span>
            <img src={uploadIcon} alt="" />
          </span>
          <span className="mt-2  bg-[#0095f6] text-white font-semibold p-3 rounded-lg cursor-pointer ">
            select from device
          </span>
        </div>
      </div>
    </div>
  );
}

export default Create;
