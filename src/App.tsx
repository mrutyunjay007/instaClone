// import { useState } from 'react'

import FooterNav from "./components/FooterNav";
import Home from "./components/Home";
import SideBar from "./components/SideBar";

function App() {
  return (
    <div>
      <div className=" hidden md:block fixed left-0">
        <SideBar></SideBar>
      </div>
      <div className="flex justify-center ">
        <Home></Home>
      </div>
      <div className="md:hidden">
        <FooterNav></FooterNav>
      </div>
    </div>
  );
}

export default App;
