import {
  CollectionReference,
  Firestore,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
// import { Todo } from "../utility/TodoType";
import { app } from "./config";

class PostService {
  db: Firestore;
  postCollectionRef: CollectionReference;

  constructor() {
    this.db = getFirestore(app);
    this.postCollectionRef = collection(this.db, "Posts");
  }

  async getAllPosts() {
    try {
      const dataRef = await getDocs(this.postCollectionRef);
      const postDataList = dataRef.docs.map((doc) => {
        const docData = doc.data();

        return {
          postId: doc.id,
          userId: docData.userId,
          userName: docData.userName,
          profilePic: docData.profilePicture,
          postUrl: docData.postUrl,
          caption: docData.caption,
          likeCount: docData.likeCount,
        };
      });
      return postDataList;
    } catch (error) {
      console.log(error);
    }
  }

  async isAuthUserLiked({
    postId,
    authUserId,
  }: {
    postId: string;
    authUserId: string;
  }) {
    try {
      const collectionRef = collection(this.postCollectionRef, postId, "Likes");

      const q = query(collectionRef, where("userId", "==", authUserId));
      const querySnapshots = await getDocs(q);

      const isLiked = querySnapshots.docs.length;

      if (isLiked === 1) {
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
    }
  }

  async updateLikeCount({
    postId,
    likeCount,
    likeStatus,
  }: {
    postId: string;
    likeCount: number;
    likeStatus: boolean;
  }) {
    try {
      const docRef = doc(this.postCollectionRef, postId);

      const currentLikeCount = likeStatus ? likeCount + 1 : likeCount - 1;
      await updateDoc(docRef, { likeCount: currentLikeCount });
    } catch (error) {
      console.log(error);
    }
  }

  async updateUsersInLikeList({
    postId,
    userId,
    userName,
    profilePic,
    likeStatus,
  }: {
    postId: string;
    userId: string;
    userName: string;
    profilePic: string;
    likeStatus: boolean;
  }) {
    try {
      const docRef = doc(this.postCollectionRef, postId, "Likes", userId);

      if (likeStatus) {
        await setDoc(docRef, { userId, userName, profilePic });
      } else {
        await deleteDoc(docRef);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getAllUserFromLikeList({ postId }: { postId: string }) {
    const collectionRef = collection(this.postCollectionRef, postId, "Likes");

    const likesListSnap = await getDocs(collectionRef);

    const likesList = likesListSnap.docs.map((doc) => {
      return {
        userId: doc.data().userId,
        userName: doc.data().userName,
        profilePic: doc.data().profilePic,
      };
    });
    return likesList;
  }
}

export const postService = new PostService();
