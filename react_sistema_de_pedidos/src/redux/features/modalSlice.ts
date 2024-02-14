import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ModalState {
  modals: { [key: string]: boolean };
}

const initialState: ModalState = {
  modals: {},
};

const modalSlice = createSlice({
  name: "modalSlice",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.modals[id] = true;
    },
    closeModal: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.modals[id] = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
