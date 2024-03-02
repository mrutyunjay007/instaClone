import {
  Firestore,
  addDoc,
  collection,
  // getDocs,
  getFirestore,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { app } from "./config";
import { Unsubscribe } from "firebase/auth";

export interface INotificationData {
  senderId: string;
  reciverId: string;
  senderUserName: string;
  noticeId: string;
  type: string;
}

class NotificationService {
  private db: Firestore;

  constructor() {
    this.db = getFirestore(app);
  }

  async getNotificationsAndUpdates(
    reciverId: string,
    cb: (notificationData: INotificationData, notificationId: string) => void
  ) {
    console.log(reciverId);

    try {
      //write query to all notification or single notification
      const q = query(
        collection(this.db, "Notification"),
        where("reciverId", "==", reciverId)
      );

      const unsubscribe: Unsubscribe = onSnapshot(q, (snaps) => {
        console.log(snaps);

        snaps.docChanges().forEach((change) => {
          if (change.type === "added") {
            console.log(change.doc.data());

            cb(change.doc.data() as INotificationData, change.doc.id);
          }
        });
      });
      return unsubscribe;
    } catch (error) {
      console.log(error);
    }
  }

  // async getAllNotificationsFirstTime(
  //   reciverId: string,
  //   cb: (notificationData: INotificationData, notificationId: string) => void
  // ) {
  //   try {
  //     const q = query(
  //       collection(this.db, "Notification"),
  //       where("reciverId", "==", reciverId)
  //     );

  //     const querySnap = await getDocs(q);
  //     console.log(querySnap);

  //     querySnap.size > 0 &&
  //       querySnap.forEach((snap) => {
  //         const notifiactionData = {
  //           senderId: snap.data().senderId,
  //           reciverId: snap.data().reciverId,
  //           senderUserName: snap.data().senderUserName,
  //           noticeId: snap.data().noticeId,
  //           type: snap.data().type,
  //         };

  //         cb(notifiactionData, snap.data().id);
  //       });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  async giveNotification(notification: INotificationData) {
    try {
      await addDoc(collection(this.db, "Notification"), notification);
    } catch (error) {
      console.log(error);
    }
  }
}

export const notificationService = new NotificationService();
