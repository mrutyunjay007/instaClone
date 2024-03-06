import { Firestore, getFirestore } from "firebase/firestore";
import { app } from "./config";
import {
  FirebaseStorage,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";

class UploadImageInServerService {
  db: Firestore;
  storage: FirebaseStorage;

  constructor() {
    this.db = getFirestore(app);
    this.storage = getStorage();
  }

  async putNewImageInFirebaseStorage({
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
}

export const uploadImageInServerService = new UploadImageInServerService();
