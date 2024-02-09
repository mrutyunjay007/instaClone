// import { useState } from "react";

import Nav from "./Nav";

function FooterNav() {
  return (
    <div className=" fixed flex justify-center items-center bg-white bottom-0 w-screen h-[9vh] border-t-2 border-s-slate-100">
      <Nav></Nav>
    </div>
  );
}

export default FooterNav;
