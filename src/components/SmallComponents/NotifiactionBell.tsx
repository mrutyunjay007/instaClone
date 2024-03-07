import { RootState } from "../../Redux/store";
import { useDispatch, useSelector } from "react-redux";
import { RiHeart3Line } from "react-icons/ri";
import { CheckingNotifications } from "../../Redux/Slice/NavSlice";

function NotifiactionBell() {
  const numberOfNotifications = useSelector(
    (state: RootState) => state.NotificationInfo.notifications.length
  );
  const dispatch = useDispatch();
  return (
    <span
      className=" cursor-pointer "
      onClick={() => {
        dispatch(CheckingNotifications());
      }}
    >
      <RiHeart3Line
        className={`size-6 dark:text-white ${
          numberOfNotifications > 0 && "animate-bouncy fill-red-700"
        }`}
      />
    </span>
  );
}

export default NotifiactionBell;
