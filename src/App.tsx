// import { useState } from 'react'

import FooterNav from "./components/FooterNav";
import Home from "./components/Home";
import SideBar from "./components/SideBar";

function App() {
  return (
    <div className="">
      <Home></Home>
      <div className="md:hidden">
        <FooterNav></FooterNav>
      </div>
      <div className=" hidden md:block">
        <SideBar></SideBar>
      </div>
    </div>
  );
}

export default App;
