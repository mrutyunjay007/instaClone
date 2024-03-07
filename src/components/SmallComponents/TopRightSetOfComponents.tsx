import ToggleBtn from "./ToggleBtn";
import { RiSearchLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import NotifiactionBell from "./NotifiactionBell";
import { Searching } from "../../Redux/Slice/NavSlice";
import { useDispatch } from "react-redux";

function TopRightSetOfComponents() {
  const dispatch = useDispatch();
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
        <span
          className=""
          onClick={() => {
            dispatch(Searching());
          }}
        >
          <RiSearchLine className="size-6 dark:text-white cursor-pointer"></RiSearchLine>
        </span>
      </Link>
    </span>
  );
}

export default TopRightSetOfComponents;
