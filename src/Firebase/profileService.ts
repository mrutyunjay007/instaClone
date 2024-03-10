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
  followingStatus: boolean;
}
interface IUserDataToFollow {
  userId: string;
  userName: string;
  profilePic: string;
  follower: boolean;
  following: boolean;
}
interface IFollowFollowing {
  authUserData: IUserDataToFollow;
  userData: IUserDataToFollow;
}

class ProfileService {
  db: Firestore;
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

      await setDoc(docRefAuth, userData);

      // // Put Logged-in-user in follower list of Other-user
      const docRefUser = doc(
        this.userCollectionRef,
        userData.userId,
        "follow",
        authUserData.userId
      );
      await setDoc(docRefUser, authUserData);
    } catch (error) {
      console.log(error);
    }
  }

  async isInFollowList({ userId, authUserId }: AuthID) {
    const docRefAuth = doc(this.db, "User", authUserId, "follow", userId);

    const docSnapAuth = await getDoc(docRefAuth);

    if (docSnapAuth.exists()) {
      return docSnapAuth.data();
    }
    return null;
  }

  async updateFollowingCount({
    userId,
    authUserId,
    authUserFollowingNum,
    followingStatus,
  }: AuthFollowingNum) {
    // Increase Logged-in-user following count
    const docAuthRef = doc(this.userCollectionRef, authUserId);
    followingStatus &&
      (await updateDoc(docAuthRef, {
        followingNumber: authUserFollowingNum + 1,
      }));
    !followingStatus &&
      (await updateDoc(docAuthRef, {
        followingNumber: authUserFollowingNum - 1,
      }));

    //Increase Other-user follower count
    const docUserRef = doc(this.userCollectionRef, userId);
    const docUserSnap = await getDoc(docUserRef);

    if (docUserSnap.exists()) {
      const userFollowingNums = docUserSnap.data().followerNumber;
      followingStatus &&
        (await updateDoc(docUserRef, {
          followerNumber: userFollowingNums + 1,
        }));
      !followingStatus &&
        (await updateDoc(docUserRef, {
          followerNumber: userFollowingNums - 1,
        }));
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

      const querySnapshot = await Promise.all(
        querySnapshots.docs.map(async (docs) => {
          const { userId, follower, following } = docs.data();
          const docRef = doc(this.db, "User", userId);
          const user = await getDoc(docRef);

          if (user.exists()) {
            const userInfoData: {
              userName: string;
              userId: string;
              profilePic: string;
              isFollower: boolean;
              isFollowing: boolean;
            } = {
              userName: user.data().userName,
              userId,
              profilePic: user.data().profilePic,
              isFollower: follower,
              isFollowing: following,
            };

            return userInfoData;
          }
          return null;
        })
      );

      return querySnapshot.filter((item) => item !== null);
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

      const querySnapshot = await Promise.all(
        querySnapshots.docs.map(async (docs) => {
          const { userId, follower, following } = docs.data();
          const docRef = doc(this.db, "User", userId);
          const user = await getDoc(docRef);

          if (user.exists()) {
            const userInfoData: {
              userName: string;
              userId: string;
              profilePic: string;
              isFollower: boolean;
              isFollowing: boolean;
            } = {
              userName: user.data().userName,
              userId,
              profilePic: user.data().profilePic,
              isFollower: follower,
              isFollowing: following,
            };

            return userInfoData;
          }
          return null;
        })
      );

      return querySnapshot.filter((item) => item !== null);
    } catch (error) {
      console.log(error);
    }
  }

  async otherUserProfile({ userId }: ID) {
    try {
      const docRef = doc(this.db, "User", userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return {
          userId: docSnap.data().userId,
          userIdName: docSnap.data().userIdName,
          userName: docSnap.data().userName,
          userBio: docSnap.data().userBio,
          profilePic: docSnap.data().profilePic,
          follower: docSnap.data().followerNumber,
          following: docSnap.data().followingNumber,
          postNumber: docSnap.data().postNumber,
        };
      }
      return null;
    } catch (error) {
      console.log(error);
    }
  }

  async getUploadedPosts({ userId }: ID) {
    try {
      const collectionRef = collection(this.db, "User", userId, "post");

      const posts = await getDocs(collectionRef);

      const postList = posts.docs.map((doc) => {
        return {
          postId: doc.data().postId,
          postUrl: doc.data().postUrl,
        };
      });
      // console.log(postList);
      return postList;
    } catch (error) {
      console.log(error);
    }
  }
}

export const profileService = new ProfileService();
