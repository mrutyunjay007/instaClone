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

const othersSlice = createSlice({
  name: "othersInfos",
  initialState,
  reducers: {
    addOthersinfo(state, actions: PayloadAction<IUser>) {
      state.status = true;
      state.userData = actions.payload;
    },
    upDateOthersFollowingCount(
      state,
      actions: PayloadAction<{ followerStatus: boolean }>
    ) {
      if (actions.payload.followerStatus) {
        state.userData.follower += 1;
      } else {
        state.userData.follower -= 1;
      }
    },
  },
});

export default othersSlice.reducer;
export const { addOthersinfo, upDateOthersFollowingCount } =
  othersSlice.actions;
