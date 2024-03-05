import ToggleBtn from "./ToggleBtn";
import { RiSearchLine } from "react-icons/ri";
import { RiHeart3Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";

function TopRightSetOfComponents() {
  const numberOfNotifications = useSelector(
    (state: RootState) => state.NotificationInfo.notifications.length
  );

  return (
    <span className="mr-2 flex justify-evenly items-center gap-3 md:hidden ">
      {/* Notification */}
      <Link to={"/notification"}>
        <span className="relative cursor-pointer">
          <RiHeart3Line
            className={`size-6 dark:text-white ${
              numberOfNotifications > 0 && "animate-bouncy fill-red-700"
            }`}
          />
        </span>
      </Link>

      {/* DarkMode */}
      <span className="">
        <ToggleBtn></ToggleBtn>
      </span>

      {/* Search */}
      <Link to={"/search"}>
        <span className="">
          <RiSearchLine className="size-6 dark:text-white cursor-pointer"></RiSearchLine>
        </span>
      </Link>
    </span>
  );
}

export default TopRightSetOfComponents;
