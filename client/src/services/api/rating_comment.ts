import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ReviewDetail } from "../../types/api";

export const rate_comment_api = createApi({
  reducerPath: "rate_comment_api",
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
    commentReview: build.mutation<
      ReviewDetail,
      { reviewId: string; text: string }
    >({
      query: (body) => ({
        url: `reviews/comment/`,
        method: "PATCH",
        body,
      }),
    }),
  }),
});

export const { useRateReviewMutation,useCommentReviewMutation } = rate_comment_api;
