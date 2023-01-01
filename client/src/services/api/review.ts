import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const reviewApi = createApi({
  reducerPath: "reviewApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    credentials: "include",
  }),
  tagTypes: ["Review"],
  endpoints: (build) => ({
    getReviews: build.query<any, any>({
      query: () => "reviews",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }: any) => ({ type: "Review" as const, id })),
              { type: "Review", id: "LIST" },
            ]
          : [{ type: "Review", id: "LIST" }],
    }),
    createReview: build.mutation<any, any>({
      query: (body) => ({
        url: "reviews",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Review", id: "LIST" }],
    }),
  }),
});

export const { useCreateReviewMutation, useGetReviewsQuery } = reviewApi;
