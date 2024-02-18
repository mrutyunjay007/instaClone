import {
  CollectionReference,
  DocumentData,
  Firestore,
  addDoc,
  collection,
  doc,
  getDocs,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
// import { Todo } from "../utility/TodoType";
import { app } from "./config";
// import { Tuple } from "@reduxjs/toolkit";

class CommentService {
  db: Firestore;
  commentCollectionRef: CollectionReference;

  constructor() {
    this.db = getFirestore(app);
    this.commentCollectionRef = collection(this.db, "Posts");
  }

  async getComments({ refArray }: { refArray: string[] }) {
    try {
      let collectionRef = this.commentCollectionRef;

      for (const str of refArray) {
        collectionRef = collection(collectionRef, str);
      }

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
    console.log(refArray);
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
      console.log(commentRef.id);

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
