import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { reviewApi } from "./services/api/review";
import { authApi } from "./services/api/auth";
import users from "./services/api/user";
import authModal from "./services/modal/modalSlice";
import reviewSteps from "./services/reviewSteps/reviewStepsSlice";

const rootReducer = combineReducers({
  [reviewApi.reducerPath]: reviewApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  authModal,
  reviewSteps,
  users,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(reviewApi.middleware)
      .concat(authApi.middleware),
});

setupListeners(store.dispatch);

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
