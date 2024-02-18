import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IRepling {
  userId: string;
  userName: string;
  commentId: string | undefined;
  repling: boolean;
}

interface IReplied {
  authUserId: string;
  content: string;
  replied: boolean;
}

const initialState = {
  userId: "",
  userName: "",
  authUserId: "",
  content: "",
  commentid: "",
  repling: false,
  replied: false,
};

const commentSlice = createSlice({
  name: "comentInfo",
  initialState,

  reducers: {
    repling(state, actions: PayloadAction<IRepling>) {
      state.userId = actions.payload.userId;
      state.userName = actions.payload.userName;
      state.repling = actions.payload.repling;
    },

    replied(state, actions: PayloadAction<IReplied>) {
      state.authUserId = actions.payload.authUserId;
      state.content = actions.payload.content;
      state.replied = actions.payload.replied;
    },
    doneOrCancel(state) {
      state.userId = "";
      state.authUserId = "";
      state.content = "";
      state.repling = false;
      state.replied = false;
    },
  },
});

export default commentSlice.reducer;
export const { repling, replied, doneOrCancel } = commentSlice.actions;
