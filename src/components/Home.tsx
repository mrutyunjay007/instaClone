// import React from 'react'

import NavBar from "./NavBar";

function Home() {
  return (
    <div className="container  w-screen bg-red-200">
      <div className=" sticky top-0  md:hidden">
        <NavBar></NavBar>
      </div>
    </div>
  );
}

export default Home;
