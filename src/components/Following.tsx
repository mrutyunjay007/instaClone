// import React from 'react'
import Connection from "./Connection";

function Following() {
  return (
    <div className="w-full ">
      <div className=" w-full h-[9vh] sticky top-0 flex justify-center items-center  border-b-2 border-s-slate-100">
        Following
      </div>
      <div className=" mt-2 flex justify-center">
        <div className="w-full md:w-3/4  lg:w-1/2">
          <Connection></Connection>
          <Connection></Connection>
          <Connection></Connection>
          <Connection></Connection>
        </div>
      </div>
    </div>
  );
}

export default Following;
