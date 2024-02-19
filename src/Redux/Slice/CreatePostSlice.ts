import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IUploadedPost {
  postId: string;
  userId: string;
  userName: string;
  profilePic: string;
  postUrl: string | undefined;
  caption: string;
  likeCount: number;
}

interface INewPost {
  selectedPost: {
    postUrl: string;
    postMetaData: null | File;
  };
  uploadedPost: IUploadedPost;
}

const emptyState: INewPost = {
  selectedPost: {
    postUrl: "",
    postMetaData: null,
  },
  uploadedPost: {
    postId: "",
    userId: "",
    userName: "",
    profilePic: "",
    postUrl: "",
    caption: "",
    likeCount: 0,
  },
};

const initialState: INewPost = emptyState;

const createPostSlice = createSlice({
  name: "newPostInfo",
  initialState,
  reducers: {
    setSelectedPost(
      state,
      actions: PayloadAction<{ postUrl: string; postMetaData: File | null }>
    ) {
      state.selectedPost.postUrl = actions.payload.postUrl;
      state.selectedPost.postMetaData = actions.payload.postMetaData;
    },
    setUploadedPost(state, actions: PayloadAction<IUploadedPost>) {
      state.uploadedPost.postId = actions.payload.postId;
      state.uploadedPost.userId = actions.payload.userId;
      state.uploadedPost.userName = actions.payload.userName;
      state.uploadedPost.profilePic = actions.payload.profilePic;
      state.uploadedPost.caption = actions.payload.caption;
      state.uploadedPost.likeCount = actions.payload.likeCount;
    },

    newPostUpLoadingDone(state) {
      state = emptyState;
    },
  },
});

export default createPostSlice.reducer;
export const { setSelectedPost, setUploadedPost, newPostUpLoadingDone } =
  createPostSlice.actions;
