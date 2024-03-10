import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// interface INav {
//   isAtHome: boolean;
//   isCreatingPost: boolean;
//   isInProfile: boolean;
// }

const initialState = {
  isAtHome: true,
  isCreatingPost: false,
  isInProfile: false,
  isInNotification: false,
  isSearching: false,
  DarkMode: false,
};

const navSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    AtHome(state) {
      state.isAtHome = true;
      state.isCreatingPost = false;
      state.isInProfile = false;
      state.isInNotification = false;
      state.isSearching = false;
    },
    CreatingPost(state) {
      state.isCreatingPost = true;
      state.isAtHome = false;
      state.isInProfile = false;
      state.isInNotification = false;
      state.isSearching = false;
    },
    InProfile(state) {
      state.isInProfile = true;
      state.isAtHome = false;
      state.isCreatingPost = false;
      state.isInNotification = false;
      state.isSearching = false;
    },

    Searching(state) {
      state.isInProfile = false;
      state.isAtHome = false;
      state.isCreatingPost = false;
      state.isInNotification = false;
      state.isSearching = true;
    },
    CheckingNotifications(state) {
      state.isInProfile = false;
      state.isAtHome = false;
      state.isCreatingPost = false;
      state.isInNotification = true;
      state.isSearching = false;
    },
    DarkLigth(state, actions: PayloadAction<boolean>) {
      state.DarkMode = actions.payload;
    },
  },
});

export const {
  AtHome,
  CreatingPost,
  InProfile,
  Searching,
  CheckingNotifications,
  DarkLigth,
} = navSlice.actions;
export default navSlice.reducer;
