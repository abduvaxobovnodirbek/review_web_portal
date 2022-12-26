import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UploadFile } from "antd";
import { Steps } from "../../types";

const initialState: Steps = {
  stepFirst: true,
  stepSecond: false,
  stepThird: false,
  previewImagesList: [],
};

const reviewStepsSlice = createSlice({
  name: "reviewSteps",
  initialState,
  reducers: {
    showStepFirst(state) {
      state.stepFirst = true;
      state.stepSecond = false;
      state.stepThird = false;
    },
    showStepSecond(state) {
      state.stepFirst = false;
      state.stepSecond = true;
      state.stepThird = false;
    },
    showStepThird(state) {
      state.stepFirst = false;
      state.stepSecond = false;
      state.stepThird = true;
    },
    setImagesPreviewList(state, action: PayloadAction<UploadFile>) {
      state.previewImagesList.push(action.payload);
    },
    deleteImagesPreviewList(state) {
      state.previewImagesList = [];
    },
  },
});

export const {
  showStepFirst,
  showStepSecond,
  showStepThird,
  setImagesPreviewList,
  deleteImagesPreviewList,
} = reviewStepsSlice.actions;

export default reviewStepsSlice.reducer;
