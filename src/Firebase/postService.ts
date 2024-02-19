import {
  CollectionReference,
  Firestore,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
// import { Todo } from "../utility/TodoType";
import { app } from "./config";
import { Todo } from "../utility/TodoType";

class PostService {
  db: Firestore;
  postCollectionRef: CollectionReference;
  storage: Todo;

  constructor() {
    this.db = getFirestore(app);
    this.postCollectionRef = collection(this.db, "Posts");
    this.storage = getStorage();
  }

  // ...........Get-Post.................
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

  async showSinglePost({ postId }: { postId: string }) {
    try {
      const docRef = doc(this.postCollectionRef, postId);
      const post = await getDoc(docRef);
      if (post.exists()) {
        return {
          postId,
          userId: post.data().userId,
          userName: post.data().userName,
          profilePic: post.data().profilePicture,
          postUrl: post.data().postUrl,
          caption: post.data().caption,
          likeCount: post.data().likeCount,
        };
      }
      return null;
    } catch (error) {
      console.log(error);
    }
  }

  // ...........Create-Post.................
  async createNewPost({
    postMetaData,
    userName,
    userId,
    profilePic,
    caption,
  }: {
    postMetaData: File;
    userName: string;
    userId: string;
    profilePic: string;
    caption: string;
  }) {
    try {
      if (postMetaData != null) {
        // get url
        const url = await this.putNewPostInFirebaseStorage({
          postMetaData,
          userName,
          userId,
        });

        const postData = {
          userId,
          userName,
          profilePicture: profilePic,
          postUrl: url,
          caption,
          likeCount: 0,
        };

        // add in Post collection and get id as return
        const postInfo = await addDoc(this.postCollectionRef, postData);

        // add post-id & post-url to User's post-subCollection to show in user profile gallary
        const postSubcollectionRef = collection(
          this.db,
          "User",
          userId,
          "post"
        );

        await setDoc(doc(postSubcollectionRef, postInfo.id), {
          postId: postInfo.id,
          postUrl: url,
        });

        return {
          postId: postInfo.id,
          userId,
          userName,
          profilePic,
          postUrl: url,
          caption,
          likeCount: 0,
        };
      }
    } catch (error) {
      console.log(error);
    }
  }

  private async putNewPostInFirebaseStorage({
    postMetaData,
    userName,
    userId,
  }: {
    postMetaData: File;
    userName: string;
    userId: string;
  }) {
    try {
      const postRef = ref(
        this.storage,
        `${userName}-${userId}-posts/${postMetaData.name}`
      );
      const uploaded = await uploadBytes(postRef, postMetaData);
      const url = await getDownloadURL(uploaded.ref);

      return url;
    } catch (error) {
      console.log(error);
    }
  }

  // ...........Like-Section.................
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
