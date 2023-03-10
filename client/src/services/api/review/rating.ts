import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ReviewDetail } from "../../../types/api";

export const rate_review = createApi({
  reducerPath: "rate_review",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    credentials: "include",
  }),
  tagTypes: [],
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  endpoints: (build) => ({
    rateReview: build.mutation<
      ReviewDetail,
      { reviewId: string; userGrade: number }
    >({
      query: (body) => ({
        url: `reviews/rate/${body.reviewId}`,
        method: "PATCH",
        body,
      }),
    }),
  }),
});

export const { useRateReviewMutation } = rate_review;
