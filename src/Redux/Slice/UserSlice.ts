import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IUser {
  userName: string;
  userId: string;
  userBio: string;
  profilePic: string;
  follower: number;
  following: number;
}
const emptyUserData: IUser = {
  userName: "",
  userId: "",
  userBio: "",
  profilePic: "",
  follower: 0,
  following: 0,
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
  },
});

export default userSlice.reducer;
export const { logIn, logOut, upDateUserFollowingCount } = userSlice.actions;
