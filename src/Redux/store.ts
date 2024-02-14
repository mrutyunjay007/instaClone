import { configureStore } from "@reduxjs/toolkit";
// import { useDispatch, useSelector } from "react-redux";
// import type { TypedUseSelectorHook } from "react-redux";
import NavSlice from "./Slice/NavSlice";
import UserSlice from "./Slice/UserSlice";
import OthersSlice from "./Slice/OthersSlice";
import CurrentUserSlice from "./Slice/CurrentUserSlice";
// import PostSlice from "./Slice/PostSlice";

const store = configureStore({
  reducer: {
    UserInfos: UserSlice,
    Navigation: NavSlice,
    OthersInfo: OthersSlice,
    CurrentUserInfo: CurrentUserSlice,
    // PostList: PostSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
// export const useCustomDispatch: () => AppDispatch = useDispatch;
// export const useCustomSelector: TypedUseSelectorHook<RootState> = useSelector;
