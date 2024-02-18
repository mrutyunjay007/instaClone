import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// Single-post Interface
export interface IPost {
  postId: string;
  userId: string;
  userName: string;
  profilePic: string;
  postUrl: string;
  caption: string;
  likeCount: number;
}

// Type of post list
export type TPostList = IPost[];

const initialState: IPost = {
  postId: "",
  userId: "",
  userName: "",
  profilePic: "",
  postUrl: "",
  caption: "",
  likeCount: 0,
};

const currentPostSlice = createSlice({
  name: "currentPostInfo",
  initialState,
  reducers: {
    addCurrentPost(state, actions: PayloadAction<IPost>) {
      state.postId = actions.payload.postId;
      state.likeCount = actions.payload.likeCount;
      state.userId = actions.payload.userId;
      state.userName = actions.payload.userName;
      state.profilePic = actions.payload.profilePic;
      state.postUrl = actions.payload.postUrl;
      state.caption = actions.payload.caption;
    },
    upDatePostId(state, actions: PayloadAction<{ postId: string }>) {
      state.postId = actions.payload.postId;
    },
  },
});

export default currentPostSlice.reducer;
export const { addCurrentPost, upDatePostId } = currentPostSlice.actions;
