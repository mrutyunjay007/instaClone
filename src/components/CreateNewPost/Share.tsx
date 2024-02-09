// import React from 'react'
// import BackIcon from "../../assets/Back.png";
function Share() {
  return (
    <div className="w-full">
      {/* nav */}
      <div className="w-full md:pl-[80px] lg:pl-[250px] sticky h-[9vh] flex justify-between p-3 items-center border-b-2 border-s-slate-100">
        {/* <span>
          <img src={BackIcon} alt="" />
        </span> */}
        <span className=" font-semibold pl-1 ">Create new post</span>
        <div className="flex gap-3 py-2 ">
          <span className="  rounded-md bg-[#0095f6] text-white font-semibold px-3 py-2  cursor-pointer">
            Share
          </span>
          <span className="  rounded-md  bg-red-500 text-white font-semibold px-3 py-2 cursor-pointer ">
            Cancel
          </span>
        </div>
      </div>

      {/* post */}
      <div className="flex justify-center ">
        <div className=" w-full flex flex-col md:w-1/2 lg:w-1/4 h-[91vh] items-center justify-start gap-2  ">
          <span className="w-full flex-1 bg-slate-500 mt-3 ">
            <img className="" src="" alt="" />
          </span>
          <span className="mt-2 w-full h-1/4 font-semibold  border-s-slate-100 border-2 p-1 rounded-lg  ">
            <textarea
              className="w-full h-full rounded-lg p-2"
              placeholder="write caption..."
            ></textarea>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Share;
