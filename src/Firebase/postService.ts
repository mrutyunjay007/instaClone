import {
  CollectionReference,
  Firestore,
  collection,
  getDocs,
  getFirestore,
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
}

export const postService = new PostService();
