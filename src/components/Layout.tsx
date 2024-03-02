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
    <div className=" md:flex justify-center dark:bg-background ">
      <Outlet></Outlet>

      <div className=" hidden  dark:bg-background md:block fixed left-0">
        <SideBar></SideBar>
      </div>

      <div className="md:hidden dark:bg-background">
        <FooterNav></FooterNav>
      </div>
    </div>
  );
}

export default Layout;
