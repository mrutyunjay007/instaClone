import ToggleBtn from "./ToggleBtn";
import { RiSearchLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import NotifiactionBell from "./NotifiactionBell";

function TopRightSetOfComponents() {
  return (
    <span className="mr-2 flex  justify-evenly items-center gap-3 md:hidden ">
      {/* Notification */}
      <Link to={"/notification"}>
        <NotifiactionBell></NotifiactionBell>
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
