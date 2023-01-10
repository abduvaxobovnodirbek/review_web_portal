import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ModalState } from "../../types";

const initialState: ModalState = {
  showModal: false,
  showEmailLoginForm: false,
  showEmailRegisterForm: false,
  showSocialRegisterForm: false,
  showSocialLoginForm: true,
  showProfileModal: false,
  darkMode: localStorage.getItem("darkMode") === "true",
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    toggleModal(state, action: PayloadAction<boolean>) {
      state.showModal = action.payload;
    },
    toggleEmailLoginForm(state, action: PayloadAction<boolean>) {
      state.showEmailLoginForm = action.payload;
      state.showEmailRegisterForm = false;
    },
    toggleEmailRegisterForm(state, action: PayloadAction<boolean>) {
      state.showEmailRegisterForm = action.payload;
      state.showEmailLoginForm = false;
    },
    toggleSocialRegisterForm(state, action: PayloadAction<boolean>) {
      state.showSocialRegisterForm = action.payload;
      state.showEmailRegisterForm = false;
      state.showEmailLoginForm = false;
      state.showSocialLoginForm = false;
    },
    toggleSocialLoginForm(state, action: PayloadAction<boolean>) {
      state.showSocialLoginForm = action.payload;
      state.showEmailRegisterForm = false;
      state.showEmailLoginForm = false;
      state.showSocialRegisterForm = false;
    },
    toggleProfileModal(state, action: PayloadAction<boolean>) {
      state.showProfileModal = action.payload;
    },
    toggleDarkMode(state, action: PayloadAction<boolean>) {
      state.darkMode = action.payload;
      localStorage.setItem("darkMode", String(action.payload));
    },
  },
});

export const {
  toggleModal,
  toggleEmailRegisterForm,
  toggleEmailLoginForm,
  toggleSocialRegisterForm,
  toggleSocialLoginForm,
  toggleProfileModal,
  toggleDarkMode,
} = modalSlice.actions;

export default modalSlice.reducer;
