// import { useState } from "react";

import Nav from "./Nav";

function FooterNav() {
  return (
    <div className="  dark:bg-background fixed flex justify-center items-center bg-white bottom-0 w-screen h-[5.1rem] border-t-2 dark:border-t-[1px] border-s-slate-100">
      <Nav></Nav>
    </div>
  );
}

export default FooterNav;
