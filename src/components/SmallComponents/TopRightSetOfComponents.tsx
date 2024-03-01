import { useState } from "react";
import ToggleBtn from "./ToggleBtn";
import { RiSearchLine } from "react-icons/ri";
import { RiHeart3Line } from "react-icons/ri";
import { Link } from "react-router-dom";
function TopRightSetOfComponents() {
  const [isNotification, setIsNotification] = useState(true);
  return (
    <span className="mr-2 flex justify-evenly items-center gap-3 md:hidden ">
      {/* Notification */}
      <Link to={"/notification"}>
        <span className="relative cursor-pointer">
          <div
            className={` ${
              isNotification ? "block" : "hidden"
            } absolute rounded-full size-[10px] top-0 right-0 border-2 dark:border-background border-s-slate-200 bg-red-700 dark:bg-red-600`}
          ></div>
          <RiHeart3Line className="size-6 dark:text-white " />
        </span>
      </Link>

      {/* DarkMode */}
      <span className="">
        <ToggleBtn></ToggleBtn>
      </span>

      {/* Search */}
      <span className="">
        <RiSearchLine className="size-6 dark:text-white cursor-pointer"></RiSearchLine>
      </span>
    </span>
  );
}

export default TopRightSetOfComponents;
