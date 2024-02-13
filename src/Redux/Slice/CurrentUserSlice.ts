import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: "",
  userId: "",
};

const currentUserSlice = createSlice({
  name: "curUserInfo",
  initialState,
  reducers: {
    setCurrentUser(
      state,
      actoin: PayloadAction<{ userName: string; userId: string }>
    ) {
      state.userId = actoin.payload.userId;
      state.userName = actoin.payload.userName;
    },
  },
});

export default currentUserSlice.reducer;
export const { setCurrentUser } = currentUserSlice.actions;
