import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import { useEffect } from "react";
import { Unsubscribe } from "firebase/auth";
import {
  INotificationData,
  notificationService,
} from "../Firebase/notificationService";
import { getAllNotification } from "../Redux/Slice/NotificationSlice";

export default function useNotification() {
  const reciverId = useSelector(
    (state: RootState) => state.UserInfos.userData.userId
  );
  const dispatch = useDispatch();

  // Get all Notification
  useEffect(() => {
    let unsubscribe: Unsubscribe | undefined;
    console.log(reciverId);

    reciverId &&
      (async () => {
        // get notifications from db
        unsubscribe = await notificationService.getNotificationsAndUpdates(
          reciverId,
          (notificationData: INotificationData, notificationId: string) => {
            //push in notificatin-state
            console.log("hmm");
            dispatch(
              getAllNotification({ ...notificationData, id: notificationId })
            );
          }
        );
      })();

    return () => {
      unsubscribe !== undefined && unsubscribe();
    };
  }, [reciverId]);
  return;
}
