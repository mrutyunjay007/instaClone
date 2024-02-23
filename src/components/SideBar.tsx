import { Link } from "react-router-dom";

import { RootState } from "../Redux/store";
import { useSelector, useDispatch } from "react-redux";
import Nav from "./Nav";
import { AtHome } from "../Redux/Slice/NavSlice";
import ToggleBtn from "./SmallComponents/ToggleBtn";
import InstaIcon from "./SmallComponents/Icons/InstaIcon/InstaIcon";
import InstaTypoIcon from "./SmallComponents/Icons/InstaIcon/instaTypoIcon";

function SideBar() {
  const { isAtHome } = useSelector((state: RootState) => state.Navigation);
  const dispatch = useDispatch();

  return (
    // Container
    <div className="flex flex-col gap-10 items-center lg:items-start  h-screen w-[72px] lg:w-[244px] lg:pl-3  border-r-2 dark:border-r-[1px]  border-s-slate-100 bg-white  dark:bg-background">
      {/* insta icon */}
      <Link to="/">
        <div
          className="mt-5  cursor-pointer"
          onClick={() => {
            !isAtHome && dispatch(AtHome());
          }}
        >
          <span className="w-6 h-6 lg:hidden">
            <InstaIcon></InstaIcon>
          </span>
          <span className=" lg:block md:hidden">
            <InstaTypoIcon></InstaTypoIcon>
          </span>
        </div>
      </Link>

      {/* nav */}
      <div className="">
        <Nav></Nav>
      </div>

      <ToggleBtn></ToggleBtn>
    </div>
  );
}

export default SideBar;
