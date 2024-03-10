import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: "",
  userId: "",
  profilePic: "",
};

const currentUserSlice = createSlice({
  name: "curUserInfo",
  initialState,
  reducers: {
    setCurrentUser(
      state,
      actoin: PayloadAction<{
        userName: string;
        userId: string;
        profilePic: string;
      }>
    ) {
      state.userId = actoin.payload.userId;
      state.userName = actoin.payload.userName;
      state.profilePic = actoin.payload.profilePic;
    },
  },
});

export default currentUserSlice.reducer;
export const { setCurrentUser } = currentUserSlice.actions;
