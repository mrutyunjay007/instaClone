import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IUser {
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
  },
});

export default userSlice.reducer;
export const { logIn, logOut } = userSlice.actions;
