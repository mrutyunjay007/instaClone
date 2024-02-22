import { PayloadAction, createSlice } from "@reduxjs/toolkit";
const initialState = {
  theme: "light",
};

const darkModeSlice = createSlice({
  name: "DarkMode",
  initialState,
  reducers: {
    lightDarkMode(state, actions: PayloadAction<{ isChecked: boolean }>) {
      if (actions.payload.isChecked) {
        state.theme = "dark";
      } else {
        state.theme = "light";
      }
    },
  },
});

export default darkModeSlice.reducer;
export const { lightDarkMode } = darkModeSlice.actions;
