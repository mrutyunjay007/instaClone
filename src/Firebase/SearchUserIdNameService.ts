import {
  Firestore,
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { app } from "./config";

class SearchUserIdName {
  db: Firestore;
  constructor() {
    this.db = getFirestore(app);
  }

  async findUserIdName(input: string) {
    try {
      const q = query(
        collection(this.db, "User"),
        where("userIdName", "==", input)
      );
      const querySnap = await getDocs(q);
      if (querySnap.size > 0) {
        return {
          userName: querySnap.docs[0].data().userName,
          userIdName: querySnap.docs[0].data().userIdName,
          userId: querySnap.docs[0].data().userId,
          userBio: querySnap.docs[0].data().userBio,
          profilePic: querySnap.docs[0].data().profilePic,
          follower: querySnap.docs[0].data().follower,
          following: querySnap.docs[0].data().following,
          postNumber: querySnap.docs[0].data().postNumber,
        };
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export const searchUserIdName = new SearchUserIdName();
