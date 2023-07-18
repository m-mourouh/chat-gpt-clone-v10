import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ModalType = {
  title: "",
  message: "",
  visible: false,
};

const modalReducer = createSlice({
  name: "modalReducer",
  initialState,
  reducers: {
    showModal: (state: ModalType, action: PayloadAction<ModalType>) => {
      state.title = action.payload.title;
      state.message = action.payload.message;
      state.visible = true;
    },
    hideModal: (state: ModalType) => {
      state.visible = false;
    },
  },
});

export default modalReducer.reducer;
export const { showModal, hideModal } = modalReducer.actions;
