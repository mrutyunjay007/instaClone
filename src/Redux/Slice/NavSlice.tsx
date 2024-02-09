import { createSlice } from "@reduxjs/toolkit";

// interface INav {
//   isAtHome: boolean;
//   isCreatingPost: boolean;
//   isInProfile: boolean;
// }

const initialState = {
  isAtHome: true,
  isCreatingPost: false,
  isInProfile: false,
};

const navSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    AtHome(state) {
      state.isAtHome = true;
      state.isCreatingPost = false;
      state.isInProfile = false;
    },
    CreatingPost(state) {
      state.isCreatingPost = true;
      state.isAtHome = false;
      state.isInProfile = false;
    },
    InProfile(state) {
      state.isInProfile = true;
      state.isAtHome = false;
      state.isCreatingPost = false;
    },
  },
});

export const { AtHome, CreatingPost, InProfile } = navSlice.actions;
export default navSlice.reducer;
