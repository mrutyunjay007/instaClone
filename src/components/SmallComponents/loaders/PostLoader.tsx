// import React from 'react'

function PostLoader() {
  return (
    <>
      {/* user info */}
      <div className="flex w-full justify-start items-center gap-2 animate-pulse">
        {/* profile picture */}
        <span className="ml-1">
          <div className="w-9 h-9 rounded-full bg-slate-200" />
        </span>
        {/* user name */}
        <span className="w-full">
          <div className="w-1/4 h-2 rounded-xl bg-slate-200"></div>
        </span>
      </div>

      {/* image */}
      <div className="w-full aspect-square bg-slate-200"></div>

      {/* engagements */}
      <div className="w-1/4 h-3 rounded-xl bg-slate-200"></div>

      {/* comments */}

      <div className="w-1/2 h-2 rounded-xl bg-slate-200"></div>
      <div className="w-1/2 h-2 rounded-xl bg-slate-200 mb-2"></div>
    </>
  );
}

export default PostLoader;
