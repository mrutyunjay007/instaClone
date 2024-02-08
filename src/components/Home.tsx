// import React from 'react'

import NavBar from "./NavBar";
import Post from "./Post";

function Home() {
  return (
    <>
      <div className=" w-full sticky  top-0  md:hidden">
        <NavBar></NavBar>
      </div>
      <div className=" flex  justify-center  items-center md:w-3/4 lg:w-1/2">
        <div className=" px-10">
          <div className="w-full">
            <Post></Post>
            <Post></Post>
            <Post></Post>
            <Post></Post>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
