import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ReviewDetail } from "../../types/api";

export const trendReviewApi = createApi({
  reducerPath: "trendReviewApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    credentials: "include",
  }),
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  endpoints: (build) => ({
    getTrendReviews: build.query<ReviewDetail[], void>({
      query: () => "reviews/trend",
      transformResponse(baseQueryReturnValue: any, meta, arg) {
        return baseQueryReturnValue.data;
      },
    }),
  }),
});

export const { useGetTrendReviewsQuery } = trendReviewApi;
