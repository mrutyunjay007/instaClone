import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SingleNotification from "./SingleNotification";
import { RiArrowLeftSLine } from "react-icons/ri";
import { RootState } from "../../Redux/store";
import { CheckingNotifications, InProfile } from "../../Redux/Slice/NavSlice";
import { useEffect } from "react";

function NotificationBody() {
  const navigater = useNavigate();
  const notificatins = useSelector(
    (state: RootState) => state.NotificationInfo.notifications
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(CheckingNotifications());
  }, []);

  return (
    <>
      {/* TopBar */}
      <div className="  dark:bg-background  sticky top-0 flex  gap-2 justify-start items-center w-full h-[5.1rem] bg-white border-b-2 border-s-slate-100 md:border-none">
        <RiArrowLeftSLine
          className="size-7 cursor-pointer dark:text-white"
          onClick={() => {
            navigater(-1);
            dispatch(InProfile());
          }}
        />
        <span className=" dark:text-color font-bold text-2xl ml-2  md:font-normal">
          Notification
        </span>
        {/* BackBtn */}
      </div>
      <div className="flex px-4 md:w-[668px] flex-col pb-[5.1rem] md:pb-[5.1rem] justify-center items-center w-full">
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
