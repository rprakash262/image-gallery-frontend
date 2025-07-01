import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { generateUniqueId } from "../../utils/generateUniqueId";

interface AlertMessage {
  id: string;
  alertMsgText: string;
  alertMsgType: string;
  timeout?: number;
}

interface AlertBoxState {
  alertMessagesList: AlertMessage[];
}

const initialState: AlertBoxState = {
  alertMessagesList: [],
};

const alertBoxSlice = createSlice({
  name: "alertBox",
  initialState,
  reducers: {
    setAlertBoxMsg: (
      state,
      action: PayloadAction<{
        alertMsgText: string;
        alertMsgType: string;
        timeout?: number;
      }>
    ) => {
      const newAlertMessage = {
        id: generateUniqueId(),
        alertMsgText: action.payload.alertMsgText,
        alertMsgType: action.payload.alertMsgType,
        timeout: action.payload.timeout,
      };

      state.alertMessagesList = [...state.alertMessagesList, newAlertMessage];
    },
    removeAlertBoxMsg: (state, action: PayloadAction<string>) => {
      const alertMsgId = action.payload;

      state.alertMessagesList = state.alertMessagesList.filter(
        (msg) => msg.id !== alertMsgId
      );
    },
  },
});

export const { setAlertBoxMsg, removeAlertBoxMsg } = alertBoxSlice.actions;

export default alertBoxSlice.reducer;
