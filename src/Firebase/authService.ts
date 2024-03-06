import {
  Auth,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import {
  collection,
  setDoc,
  getFirestore,
  CollectionReference,
  Firestore,
  getDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { app } from "./config";
import { uploadImageInServerService } from "./UploadImageInServerService";
// import { Todo } from "../utility/TodoType";

class AuthService {
  private googleProvider = new GoogleAuthProvider(); // Athantication by google
  private auth: Auth;
  private db: Firestore;
  private collectionRef: CollectionReference;
  // private ID: Todo;

  constructor() {
    this.auth = getAuth(app);
    this.db = getFirestore(app);
    this.collectionRef = collection(this.db, "User");
  }

  //Sign-up with Google
  async googleSignUp() {
    try {
      await signInWithPopup(this.auth, this.googleProvider);

      onAuthStateChanged(this.auth, async (user) => {
        try {
          if (user) {
            const userName = user.displayName;

            const userId = user.uid;

            const docRef = doc(this.collectionRef, userId);
            const docSnap = await getDoc(docRef);
            if (!docSnap.exists()) {
              const createNewUser = {
                userName,
                userIdName: "",
                userId,
                profilePic: "",
                userBio: "",
                followerNumber: 0,
                followingNumber: 0,
              };

              setDoc(doc(this.collectionRef, userId), createNewUser);
            }
          }
        } catch (error) {
          console.log(error);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
  //get current user Info
  async getCurrentUser() {
    try {
      const currentUser = this.auth.currentUser;

      if (currentUser) {
        const docRef = doc(this.db, "User", currentUser.uid);

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log(docSnap.data().followerNumber);

          console.log(docSnap.data().followingNumber);

          return {
            userName: docSnap.data().userName,
            userIdName: docSnap.data().userIdName,
            userId: docSnap.data().userId,
            userBio: docSnap.data().userBio,
            profilePic: docSnap.data().profilePic,
            follower: docSnap.data().followerNumber,
            following: docSnap.data().followingNumber,
            postNumber: docSnap.data().postNumber,
          };
        }
      }
      return null;
    } catch (error) {
      console.log(error);
    }
  }

  async updateUserIdName({
    userId,
    userIdName,
  }: {
    userId: string;
    userIdName: string;
  }) {
    try {
      if (userId.length > 0) {
        const docRef = doc(this.db, "User", userId);
        await updateDoc(docRef, { userIdName });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async updateUserBio({
    userId,
    userBio,
  }: {
    userId: string;
    userBio: string;
  }) {
    try {
      if (userId.length > 0) {
        const docRef = doc(this.db, "User", userId);
        await updateDoc(docRef, { userBio });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async updateUserName({
    userId,
    userName,
  }: {
    userId: string;
    userName: string;
  }) {
    try {
      if (userId.length > 0) {
        const docRef = doc(this.db, "User", userId);
        await updateDoc(docRef, { userName });
      }
    } catch (error) {
      console.log(error);
    }
  }
  async updateUserProfilePic({
    userId,
    userName,
    picMetaData,
  }: {
    userId: string;
    userName: string;
    picMetaData: File;
  }) {
    try {
      if (picMetaData != null) {
        // get url
        const url =
          await uploadImageInServerService.putNewImageInFirebaseStorage({
            postMetaData: picMetaData,
            userName,
            userId,
          });

        //update profile pic url in user
        await updateDoc(doc(this.db, "User", userId), { profilePic: url });

        return url;
      }
    } catch (error) {
      console.log(error);
    }
  }
}
export const authService = new AuthService();
