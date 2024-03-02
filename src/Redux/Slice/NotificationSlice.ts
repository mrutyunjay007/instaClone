import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { INotificationData } from "../../Firebase/notificationService";

interface INotice extends INotificationData {
  id: string;
}

const initialState = {
  status: false,
  notifications: new Array<INotice>(),
};
const notificationSlice = createSlice({
  name: "notificationInfo",
  initialState,
  reducers: {
    getAllNotification(state, actions: PayloadAction<INotice>) {
      state.notifications.push(actions.payload);
    },
    deleteSingleNotification(state, actions: PayloadAction<string>) {
      state.notifications = state.notifications.filter(
        (notice) => actions.payload !== notice.id
      );
    },
  },
});

export default notificationSlice.reducer;
export const { getAllNotification, deleteSingleNotification } =
  notificationSlice.actions;
