// import { PayloadAction, createSlice } from "@reduxjs/toolkit";

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
// export type TPostList = IPost[];

// const initialState: TPostList = [];

// const postSlice = createSlice({
//   name: "postList",
//   initialState,
//   reducers: {
//     setPostList(state, actions: PayloadAction<TPostList>) {
//       state = actions.payload;
//     },
//   },
// });

// export default postSlice.reducer;
// export const { setPostList } = postSlice.actions;
