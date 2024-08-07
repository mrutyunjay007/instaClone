import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IUser {
  userName: string;
  userIdName: string;
  userId: string;
  userBio: string;
  profilePic: string;
  follower: number;
  following: number;
  postNumber: number;
}
const emptyUserData: IUser = {
  userName: "",
  userIdName: "",
  userId: "",
  userBio: "",
  profilePic: "",
  follower: 0,
  following: 0,
  postNumber: 0,
};

const initialState = {
  status: false,
  userData: {
    ...emptyUserData,
  },
};

const userSlice = createSlice({
  name: "userInfos",
  initialState,
  reducers: {
    logIn(state, actions: PayloadAction<IUser>) {
      state.status = true;
      state.userData = actions.payload;
    },
    logOut(state) {
      state.status = false;
      state.userData = emptyUserData;
    },
    upDateUserFollowingCount(
      state,
      actions: PayloadAction<{ followingStatus: boolean }>
    ) {
      if (actions.payload.followingStatus) {
        state.userData.following += 1;
      } else {
        state.userData.following -= 1;
      }
    },
    upadateNumberOfPost(state) {
      state.userData.postNumber += 1;
    },
    updateUserIdName(state, actions: PayloadAction<string>) {
      state.userData.userIdName = actions.payload;
    },
    EditingUserName(state, actions: PayloadAction<string>) {
      state.userData.userName = actions.payload;
    },
    EditingBio(state, actions: PayloadAction<string>) {
      state.userData.userBio = actions.payload;
    },
    UpdateProfilePicUlr(state, actions: PayloadAction<string>) {
      state.userData.profilePic = actions.payload;
    },
  },
});

export default userSlice.reducer;
export const {
  logIn,
  logOut,
  upDateUserFollowingCount,
  upadateNumberOfPost,
  updateUserIdName,
  EditingUserName,
  EditingBio,
  UpdateProfilePicUlr,
} = userSlice.actions;
