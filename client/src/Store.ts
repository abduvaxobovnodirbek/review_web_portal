import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { reviewApi } from "./services/api/review";
import { authApi } from "./services/api/auth";
import { categoryApi } from "./services/api/category";
import { rateApi } from "./services/api/rating";
import { basketApi } from "./services/api/basket";
import { trendReviewApi } from "./services/api/trendReviews";
import users from "./services/api/user";
import authModal from "./services/modal/modalSlice";
import reviewSteps from "./services/reviewSteps/reviewStepsSlice";

const rootReducer = combineReducers({
  [reviewApi.reducerPath]: reviewApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
  [basketApi.reducerPath]: basketApi.reducer,
  [rateApi.reducerPath]: rateApi.reducer,
  [trendReviewApi.reducerPath]: trendReviewApi.reducer,

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
      .concat(authApi.middleware)
      .concat(categoryApi.middleware)
      .concat(basketApi.middleware)
      .concat(rateApi.middleware)
      .concat(trendReviewApi.middleware),
});

setupListeners(store.dispatch);

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
