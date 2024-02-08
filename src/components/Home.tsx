// import React from 'react'

import NavBar from "./NavBar";
import Post from "./Post";

function Home() {
  return (
    <div className="container w-full md:w-3/4 lg:w-1/2">
      <div className=" sticky top-0  md:hidden">
        <NavBar></NavBar>
      </div>
      <div className="w-full">
        <Post></Post>
        <Post></Post>
        <Post></Post>
        <Post></Post>
      </div>
    </div>
  );
}

export default Home;
