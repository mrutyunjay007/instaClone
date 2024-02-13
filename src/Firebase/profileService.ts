import {
  CollectionReference,
  Firestore,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
// import { Todo } from "../utility/TodoType";
import { app } from "./config";

interface ID {
  userId: string;
}
interface AuthID extends ID {
  authUserId: string;
}
interface AuthFollowingNum extends AuthID {
  authUserFollowingNum: number;
}
interface IUserDataToFollow {
  userId: string;
  userName: string;
  profilePic: string;
  follow: boolean;
  following: boolean;
}
interface IFollowFollowing {
  authUserData: IUserDataToFollow;
  userData: IUserDataToFollow;
}

class ProfileService {
  private db: Firestore;
  private userCollectionRef: CollectionReference;

  constructor() {
    this.db = getFirestore(app);
    this.userCollectionRef = collection(this.db, "User");
  }

  async upDateFollowingFromFollowList({
    userId,
    authUserId,
    followingStatus,
  }: {
    userId: string;
    authUserId: string;
    followingStatus: boolean;
  }) {
    try {
      // Put Other-user in following list of Logged-in-users
      const docRefAuth = doc(
        this.userCollectionRef,
        authUserId,
        "follow",
        userId
      );
      await updateDoc(docRefAuth, { following: followingStatus });

      // // Put Logged-in-user in follower list of Other-user
      const docRefUser = doc(
        this.userCollectionRef,
        userId,
        "follow",
        authUserId
      );
      await updateDoc(docRefUser, { follower: followingStatus });
    } catch (error) {
      console.log(error);
    }
  }

  async upDateFollowingFromProfile({
    authUserData,
    userData,
  }: IFollowFollowing) {
    try {
      // Put Other-user in following list of Logged-in-users
      const docRefAuth = doc(
        this.userCollectionRef,
        authUserData.userId,
        "follow",
        userData.userId
      );

      await setDoc(docRefAuth, authUserData);

      // // Put Logged-in-user in follower list of Other-user
      const docRefUser = doc(
        this.userCollectionRef,
        userData.userId,
        "follow",
        authUserData.userId
      );
      await setDoc(docRefUser, userData);
    } catch (error) {
      console.log(error);
    }
  }

  async isInFollowList({ userId, authUserId }: AuthID) {
    const docRefAuth = doc(
      this.userCollectionRef,
      authUserId,
      "follow",
      userId
    );
    const docSnapAuth = await getDoc(docRefAuth);

    if (docSnapAuth.exists()) {
      return docSnapAuth.data();
    }
    return null;
  }

  async increaseFollowingNum({
    userId,
    authUserId,
    authUserFollowingNum,
  }: AuthFollowingNum) {
    // Increase Logged-in-user following count
    const docAuthRef = doc(this.userCollectionRef, "User", authUserId);
    await updateDoc(docAuthRef, { following: authUserFollowingNum++ });

    //Increase Other-user follower count
    const docUserRef = doc(this.userCollectionRef, userId);
    const docUserSnap = await getDoc(docUserRef);

    if (docUserSnap.exists()) {
      const userFollowingNums = docUserSnap.data().follower;
      await updateDoc(docAuthRef, { follower: userFollowingNums + 1 });
    }
  }

  async getFollowerData({ userId }: ID) {
    try {
      const collectionRef = collection(
        this.userCollectionRef,
        userId,
        "follow"
      );

      const q = query(collectionRef, where("follower", "==", true));
      const querySnapshots = await getDocs(q);

      const querySnapshot = querySnapshots.docs.map((doc) => {
        const { userName, userId, userProfilePic, follower, following } =
          doc.data();
        return {
          userName,
          userId,
          profilePic: userProfilePic,
          isFollower: follower,
          isFollowing: following,
        };
      });
      return querySnapshot;
    } catch (error) {
      console.log(error);
    }
  }

  async getFollowingData({ userId }: ID) {
    try {
      const collectionRef = collection(
        this.userCollectionRef,
        userId,
        "follow"
      );
      // const docSnap = await getDoc(docRef);
      const q = query(collectionRef, where("following", "==", true));
      const querySnapshots = await getDocs(q);

      const querySnapshot = querySnapshots.docs.map((doc) => {
        const { userName, userId, userProfilePic, follower, following } =
          doc.data();
        return {
          userName,
          userId,
          profilePic: userProfilePic,
          isFollower: follower,
          isFollowing: following,
        };
      });
      return querySnapshot;
    } catch (error) {
      console.log(error);
    }
  }

  async otherUserProfile({ userId }: ID) {
    try {
      const docRef = doc(this.userCollectionRef, userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return {
          userId: docSnap.data().userId,
          userName: docSnap.data().userName,
          userBio: docSnap.data().userBio,
          profilePic: docSnap.data().profilePic,
          follower: docSnap.data().followerNumber,
          following: docSnap.data().followingNumber,
        };
      }
      return null;
    } catch (error) {
      console.log(error);
    }
  }
}

export const profileService = new ProfileService();
