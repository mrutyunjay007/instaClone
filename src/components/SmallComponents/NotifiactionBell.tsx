import { RootState } from "../../Redux/store";
import { useSelector } from "react-redux";
import { RiHeart3Line } from "react-icons/ri";

function NotifiactionBell() {
  const numberOfNotifications = useSelector(
    (state: RootState) => state.NotificationInfo.notifications.length
  );
  return (
    <span className=" cursor-pointer">
      <RiHeart3Line
        className={`size-6 dark:text-white ${
          numberOfNotifications > 0 && "animate-bouncy fill-red-700"
        }`}
      />
    </span>
  );
}

export default NotifiactionBell;
