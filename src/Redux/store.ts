import { configureStore } from "@reduxjs/toolkit";
// import { useDispatch, useSelector } from "react-redux";
// import type { TypedUseSelectorHook } from "react-redux";
import NavSlice from "./Slice/NavSlice";
import UserSlice from "./Slice/UserSlice";
import OthersSlice from "./Slice/OthersSlice";
import CurrentUserSlice from "./Slice/CurrentUserSlice";
import CurrentPostSlice from "./Slice/CurrentPostSlice";
import CommentSlice from "./Slice/CommentSlice";
import CreatePostSlice from "./Slice/CreatePostSlice";
import CurrentGallaryPostSlice from "./Slice/CurrentGallaryPostSlice";

const store = configureStore({
  reducer: {
    UserInfos: UserSlice,
    Navigation: NavSlice,
    OthersInfo: OthersSlice,
    CurrentUserInfo: CurrentUserSlice,
    CurrentPostInfo: CurrentPostSlice,
    CommentInfo: CommentSlice,
    CreatePostInfo: CreatePostSlice,
    CurrentGallaryPostInfo: CurrentGallaryPostSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
