// import React from 'react'

import PostLoader from "./PostLoader";

function PostsLoader() {
  return (
    <div className=" dark:bg-background flex flex-col w-full md:w-[468px] gap-2 mt-2 bg-white mb-4 border-b-2 border-s-slate-100">
      <PostLoader></PostLoader>
      <PostLoader></PostLoader>
    </div>
  );
}

export default PostsLoader;
