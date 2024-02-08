// import { useState } from 'react'

// import Follower from "./components/Follower";
import Following from "./components/Following";
import FooterNav from "./components/FooterNav";
// import Home from "./components/Home";
import SideBar from "./components/SideBar";
// import User from "./components/User";

function App() {
  return (
    <div className="  md:flex justify-center ">
      {/* <Follower></Follower> */}
      <Following></Following>
      {/* <User></User> */}
      <div className=" hidden md:block fixed left-0">
        <SideBar></SideBar>
      </div>
      {/* <div className="flex justify-center ">
        <Home></Home>
      </div> */}
      <div className="md:hidden">
        <FooterNav></FooterNav>
      </div>
    </div>
  );
}

export default App;
