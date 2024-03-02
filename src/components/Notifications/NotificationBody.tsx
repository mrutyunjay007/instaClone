import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SingleNotification from "./SingleNotification";
import { RiArrowLeftSLine } from "react-icons/ri";
import { RootState } from "../../Redux/store";

function NotificationBody() {
  const navigater = useNavigate();
  const notificatins = useSelector(
    (state: RootState) => state.NotificationInfo.notifications
  );

  return (
    <>
      {/* TopBar */}
      <div className="  dark:bg-background sticky top-0 flex  gap-2 justify-start items-center w-full h-[9vh] bg-white border-b-2 border-s-slate-100 md:border-none">
        <RiArrowLeftSLine
          className="size-7 cursor-pointer dark:text-white"
          onClick={() => {
            navigater(-1);
          }}
        />
        <span className=" dark:text-color font-bold text-2xl ml-2  md:font-normal">
          Notification
        </span>
        {/* BackBtn */}
      </div>
      <div className="flex flex-col justify-center items-center w-full">
        {notificatins.map((notification) => (
          <SingleNotification
            key={notification.id}
            id={notification.id}
            userName={notification.senderUserName}
            type={notification.type}
            userId={notification.senderId}
            noticeId={notification.noticeId}
          ></SingleNotification>
        ))}
      </div>
    </>
  );
}

export default NotificationBody;
