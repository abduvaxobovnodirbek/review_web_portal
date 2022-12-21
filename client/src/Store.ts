import { configureStore } from "@reduxjs/toolkit";
import authModal from "./services/modal/modalSlice";

const store = configureStore({
  reducer: {
    authModal,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
