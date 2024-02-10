import {
  Auth,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import {
  collection,
  doc,
  setDoc,
  getFirestore,
  CollectionReference,
  Firestore,
  getDoc,
} from "firebase/firestore";
import { app } from "./config";
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

      onAuthStateChanged(this.auth, (user) => {
        if (user) {
          const userName = user.displayName;
          const profilePic = user.photoURL;
          const userId = user.uid;

          // this.ID = user.uid;
          // console.log(this.ID);

          const createNewUser = {
            userName,
            userId,
            profilePic,
            userBio: "",
            followerNumber: 0,
            followingNumber: 0,
          };

          setDoc(doc(this.collectionRef, userId), createNewUser);
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
          return {
            userName: docSnap.data().userName,
            userId: docSnap.data().userId,
            userBio: docSnap.data().userBio,
            profilePic: docSnap.data().profilePic,
            follower: docSnap.data().followerNumber,
            following: docSnap.data().followingNumber,
          };
        }
      }
      return null;
    } catch (error) {
      console.log(error);
    }
  }
}
export const authService = new AuthService();
