import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: MessageType = {
  value: "",
  isDisabled: true,
  limited: false,
};

const messageReducer = createSlice({
  name: "messag-reducer",
  initialState,
  reducers: {
    setMessageValue: (state: MessageType, action: PayloadAction<string>) => {
      state.value = action.payload;
      if (action.payload.length > 0) {
        state.isDisabled = false;
      } else {
        state.isDisabled = true;
      }
    },
    setActive: (state: MessageType) => {
      state.isDisabled = false;
    },
    setDisabled: (state: MessageType) => {
      state.isDisabled = true;
    },
    setLimited: (state: MessageType) => {
      localStorage.setItem("limited", "true");
      state.limited = true;
    },
  },
});

export default messageReducer.reducer;
export const { setMessageValue, setActive, setDisabled, setLimited } =
  messageReducer.actions;
