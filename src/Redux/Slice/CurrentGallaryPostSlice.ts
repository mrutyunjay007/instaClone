import { PayloadAction, createSlice } from "@reduxjs/toolkit";
const initialState = {
  postId: "",
};

const currentGallaryPostSlice = createSlice({
  name: "currentGallaryPostInfo",
  initialState,
  reducers: {
    setPostId(state, actions: PayloadAction<{ postId: string }>) {
      state.postId = actions.payload.postId;
    },
    clearPostId(state) {
      state.postId = "";
    },
  },
});

export default currentGallaryPostSlice.reducer;
export const { setPostId, clearPostId } = currentGallaryPostSlice.actions;
