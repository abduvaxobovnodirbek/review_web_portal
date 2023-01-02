import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ReviewDetail, ReviewsType } from "../../types/api";

export const reviewApi = createApi({
  reducerPath: "reviewApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    credentials: "include",
  }),
  tagTypes: ["Review"],
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  endpoints: (build) => ({
    getReviews: build.query<ReviewsType, number>({
      query: (page) => `reviews?page=${page}&limit=5`,
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache: any, newItems: any) => {
        currentCache.data.push(...newItems.data);
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }: any) => ({
                type: "Review" as const,
                id,
              })),
              { type: "Review", id: "LIST" },
            ]
          : [{ type: "Review", id: "LIST" }],
    }),
    getTags: build.query<string[], void>({
      query: () => "reviews/tags",
      transformResponse(baseQueryReturnValue: any, meta, arg) {
        return baseQueryReturnValue.tags;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }: any) => ({ type: "Review" as const, id })),
              { type: "Review", id: "LIST" },
            ]
          : [{ type: "Review", id: "LIST" }],
    }),
    getReviewDetail: build.query<ReviewDetail, string>({
      query: (id) => `reviews/${id}`,
      transformResponse(baseQueryReturnValue: any, meta, arg) {
        return baseQueryReturnValue.data;
      },
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

export const {
  useCreateReviewMutation,
  useGetReviewsQuery,
  useGetTagsQuery,
  useGetReviewDetailQuery,
} = reviewApi;
