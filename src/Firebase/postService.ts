import {
  CollectionReference,
  FieldValue,
  Firestore,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  startAfter,
  updateDoc,
  where,
} from "firebase/firestore";
import { FirebaseStorage, getStorage } from "firebase/storage";
import { app } from "./config";
import { uploadImageInServerService } from "./UploadImageInServerService";
// import { IPosts } from "../components/Home";

class PostService {
  db: Firestore;
  postCollectionRef: CollectionReference;
  storage: FirebaseStorage;

  constructor() {
    this.db = getFirestore(app);
    this.postCollectionRef = collection(this.db, "Posts");
    this.storage = getStorage();
  }

  // ...........Get-Post.................
  async getNextPosts(lastVisible: FieldValue) {
    try {
      const first = query(
        collection(this.db, "Posts"),
        orderBy("createdAt"),
        startAfter(lastVisible),
        limit(5)
      );
      const dataRef = await getDocs(first);
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
          createdAt: docData.createdAt,
        };
      });
      return postDataList;
    } catch (error) {
      console.log(error);
    }
  }
  async getFirstPosts() {
    try {
      const first = query(
        collection(this.db, "Posts"),
        orderBy("createdAt"),
        limit(2)
      );
      const dataRef = await getDocs(first);
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
          createdAt: docData.createdAt,
        };
      });
      return postDataList;
    } catch (error) {
      console.log(error);
    }
  }

  async showSinglePost({ postId }: { postId: string }) {
    try {
      const docRef = doc(this.db, "Posts", postId);
      const post = await getDoc(docRef);
      if (post.exists()) {
        console.log(post.data());

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
    currentNumberOfPost,
  }: {
    postMetaData: File;
    userName: string;
    userId: string;
    profilePic: string;
    caption: string;
    currentNumberOfPost: number;
  }) {
    try {
      if (postMetaData != null) {
        // get url
        const url =
          await uploadImageInServerService.putNewImageInFirebaseStorage({
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
          createdAt: serverTimestamp(), // This adds the server timestamp
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

        //increase post count in db
        const docRef = doc(this.db, "User", userId);
        await updateDoc(docRef, { postNumber: currentNumberOfPost + 1 });

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

  //...........Saving Post........
  async updateSaveStatusforCurrentUser({
    postData: { postId, postUrl },
    isSaved,
    authUserId,
  }: {
    postData: {
      postId: string;
      postUrl: string;
    };
    isSaved: boolean;
    authUserId: string;
  }) {
    try {
      const postRef = doc(
        this.postCollectionRef,
        postId,
        "savedBy",
        authUserId
      );
      const userRef = doc(this.db, "User", authUserId, "saved", postId);

      if (isSaved) {
        // save for User collection
        await setDoc(userRef, {
          postId,
          postUrl,
        });
        // save for Post collection
        await setDoc(postRef, { userId: authUserId });
      } else {
        // remove from User collection
        await deleteDoc(userRef);
        // remove from Post collection
        await deleteDoc(postRef);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async isPostSaved({ postId, userId }: { postId: string; userId: string }) {
    try {
      // Find in user that post is already been saved or not
      const docRef = doc(this.db, "Posts", postId, "savedBy", userId);
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
    }
  }

  async getAllSavedPosts({ userId }: { userId: string }) {
    try {
      const collectionRef = collection(this.db, "User", userId, "saved");
      const dataSnap = await getDocs(collectionRef);

      const savedPosts = dataSnap.docs.map((doc) => {
        return {
          postId: doc.data().postId,
          postUrl: doc.data().postUrl,
        };
      });

      return savedPosts;
    } catch (error) {
      console.log(error);
    }
  }
}

export const postService = new PostService();
