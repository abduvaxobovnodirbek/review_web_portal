import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ReviewDetail } from "../../types/api";

export const searchApi = createApi({
  reducerPath: "searchApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    credentials: "include",
  }),
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  endpoints: (build) => ({
    getSearchedReviews: build.query<ReviewDetail[], string>({
      query: (value) => `search/full-text-review?q=${value}`,
      transformResponse(baseQueryReturnValue: any, meta, arg) {
        return baseQueryReturnValue.data;
      },
    }),
    getSuggestedReviews: build.query<
      ReviewDetail[],
      { reviewId: string; id: string }
    >({
      query: (data) => `reviews/${data.reviewId}/suggested?category=${data.id}`,
      transformResponse(baseQueryReturnValue: any, meta, arg) {
        return baseQueryReturnValue.data;
      },
    }),
    getSelectedReviews: build.query<
      ReviewDetail[],
      { value: string; type: "tags" | "category" }
    >({
      query: (data) => `search/selected?${data.type}=${data.value}`,
      transformResponse(baseQueryReturnValue: any, meta, arg) {
        return baseQueryReturnValue.data;
      },
    }),
  }),
});

export const {
  useGetSuggestedReviewsQuery,
  useGetSelectedReviewsQuery,
  useGetSearchedReviewsQuery,
} = searchApi;
