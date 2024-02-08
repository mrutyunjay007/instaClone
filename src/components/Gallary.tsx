// import React from 'react'

function Gallary() {
  return (
    <div>
      {/* ========= all Posts of User ========== */}

      <div className=" w-full grid  grid-cols-3  auto-rows-fr gap-2 p-2">
        <div className=" bg-slate-100">
          <img
            className="w-full h-full aspect-square object-cover "
            src=""
            alt=""
          />
        </div>
        <div className=" bg-slate-100">
          <img
            className="w-full h-full aspect-square object-cover "
            src=""
            alt=""
          />
        </div>
        <div className=" bg-slate-100">
          <img
            className="w-full h-full aspect-square object-cover "
            src=""
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default Gallary;
