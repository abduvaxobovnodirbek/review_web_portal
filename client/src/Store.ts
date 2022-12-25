import { configureStore } from "@reduxjs/toolkit";
import authModal from "./services/modal/modalSlice";
import reviewSteps from "./services/reviewSteps/reviewStepsSlice";

const store = configureStore({
  reducer: {
    authModal,
    reviewSteps,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
