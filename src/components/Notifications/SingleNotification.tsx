// import React from "react";

import { useDispatch } from "react-redux";
import NotificationContent from "./NotificationContent";
import { RiAccountCircleLine } from "react-icons/ri";
import { profileService } from "../../Firebase/profileService";
import { addOthersinfo } from "../../Redux/Slice/OthersSlice";
import { useNavigate } from "react-router-dom";
import { setPostId } from "../../Redux/Slice/CurrentGallaryPostSlice";
import { deleteSingleNotification } from "../../Redux/Slice/NotificationSlice";

function SingleNotification({
  userName,
  type,
  // userId,
  noticeId,
  id,
}: {
  userName: string;
  type: string;
  userId: string;
  noticeId: string;
  id: string;
}) {
  const dispatch = useDispatch();
  const navigater = useNavigate();

  const notificationHandeler = async () => {
    try {
      if (type == "follow") {
        //redirect to other user profile

        const otherUserInfo = await profileService.otherUserProfile({
          // noticeId can be same as userId
          // if notifecation is follow type
          userId: noticeId,
        });

        if (otherUserInfo) {
          dispatch(addOthersinfo({ ...otherUserInfo }));
        }

        //navigate to other user profile
        navigater("/othersProfile");
      } else {
        // redirect to post
        // noticeId can be same as postId
        // if notifecation is like or comment or reply type
        dispatch(setPostId({ postId: noticeId }));

        //navigate to post
        navigater("/singlePost");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="flex mt-3 p-5 justify-start gap-3 font-semibold cursor-pointer w-full border-2 border-slate-200 rounded-xl bg-white items-center px-4"
      onClick={() => {
        notificationHandeler();
        dispatch(deleteSingleNotification(id));
      }}
    >
      <span>
        <RiAccountCircleLine className="size-7 dark:text-white" />
      </span>
      <span className="dark:text-white">
        {userName}
        <NotificationContent type={type} />
      </span>
    </div>
  );
}

export default SingleNotification;
