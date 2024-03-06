import FooterNav from "./FooterNav";
// import Home from "./Home";
import SideBar from "./SideBar";
// import User from "./User";
import { Outlet } from "react-router-dom";
import useNotification from "../Hooks/useNotification";

function Layout() {
  //get all notifications
  useNotification();
  return (
    <div className=" md:flex  dark:bg-background ">
      <span className=" hidden  dark:bg-background md:block fixed ">
        <SideBar></SideBar>
      </span>

      <span className="flex-1 w-full md:pl-[72px] lg:pl-[244px] flex flex-col items-center">
        <Outlet></Outlet>
      </span>

      <span className="md:hidden dark:bg-background ">
        <FooterNav></FooterNav>
      </span>
    </div>
  );
}

export default Layout;
