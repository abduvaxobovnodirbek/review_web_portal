import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ModalState = {
  showModal: boolean;
  emailLoginForm: boolean;
  emailRegisterForm: boolean;
};

const initialState: ModalState = {
  showModal: false,
  emailLoginForm: false,
  emailRegisterForm: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal(state) {
      state.showModal = true;
    },
    closeModal(state) {
      state.showModal = false;
    },
    toggleEmailLoginForm(state, action: PayloadAction<boolean>) {
      state.emailLoginForm = action.payload;
      state.emailRegisterForm = false;
    },
    toggleEmailRegisterForm(state, action: PayloadAction<boolean>) {
      state.emailRegisterForm = action.payload;
      state.emailLoginForm = false;
    },
  },
});

export const {
  openModal,
  closeModal,
  toggleEmailRegisterForm,
  toggleEmailLoginForm,
} = modalSlice.actions;

export default modalSlice.reducer;
