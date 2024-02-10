import { configureStore } from "@reduxjs/toolkit";
// import { useDispatch, useSelector } from "react-redux";
// import type { TypedUseSelectorHook } from "react-redux";
import NavSlice from "./Slice/NavSlice";
import UserSlice from "./Slice/UserSlice";

const store = configureStore({
  reducer: {
    UserInfos: UserSlice,
    Navigation: NavSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
// export const useCustomDispatch: () => AppDispatch = useDispatch;
// export const useCustomSelector: TypedUseSelectorHook<RootState> = useSelector;
