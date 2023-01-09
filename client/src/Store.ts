import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { reviewApi } from "./services/api/review/review";
import { authApi } from "./services/api/user/auth";
import { categoryApi } from "./services/api/review/category";
import { rate_review } from "./services/api/review/rating";
import { basketApi } from "./services/api/user/basket";
import { trendReviewApi } from "./services/api/review/trendReviews";
import users from "./services/api/user/user";
import authModal from "./services/ui/modalSlice";
import reviewSteps from "./services/ui/reviewStepsSlice";
import { searchApi } from "./services/api/search";

const rootReducer = combineReducers({
  [reviewApi.reducerPath]: reviewApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
  [basketApi.reducerPath]: basketApi.reducer,
  [rate_review.reducerPath]: rate_review.reducer,
  [trendReviewApi.reducerPath]: trendReviewApi.reducer,
  [searchApi.reducerPath]: searchApi.reducer,

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
      .concat(rate_review.middleware)
      .concat(searchApi.middleware)
      .concat(trendReviewApi.middleware),
});

setupListeners(store.dispatch);

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
