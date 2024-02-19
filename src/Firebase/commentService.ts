import {
  // CollectionReference,
  DocumentData,
  Firestore,
  addDoc,
  collection,
  doc,
  getDocs,
  getFirestore,
  updateDoc,
} from "firebase/firestore";

import { app } from "./config";

class CommentService {
  private db: Firestore;
  //  private  commentCollectionRef: CollectionReference;

  constructor() {
    this.db = getFirestore(app);
    // this.commentCollectionRef = collection(this.db, "Posts");
  }

  async getComments({ refArray }: { refArray: string[] }) {
    try {
      const collectionRef = collection(this.db, "Posts", ...refArray);

      const dataRef = await getDocs(collectionRef);
      const commentList = dataRef.docs.map((doc) => {
        const docData = doc.data() as DocumentData;

        return {
          userId: docData.userId,
          userName: docData.userName,
          profilePic: docData.profilePic,
          content: docData.content,
          commentId: docData.commentId,
        };
      });
      return commentList;
    } catch (error) {
      console.log(error);
    }
  }

  async createNewComment({
    userData,
    content,
    refArray,
  }: {
    userData: { userId: string; userName: string; profilePic: string };
    content: string;
    refArray: string[];
  }) {
    try {
      const collectionRef = collection(this.db, "Posts", ...refArray);

      const newComment = {
        userId: userData.userId,
        userName: userData.userName,
        profilePic: userData.profilePic,
        content,
        commentId: "",
      };

      const commentRef = await addDoc(collectionRef, newComment);

      if (commentRef) {
        await updateDoc(doc(collectionRef, commentRef.id), {
          commentId: commentRef.id,
        });
      }

      return commentRef.id;
    } catch (error) {
      console.log(error);
    }
  }
}

export const commentService = new CommentService();
