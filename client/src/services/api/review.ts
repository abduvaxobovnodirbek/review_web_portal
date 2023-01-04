import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ReviewAndUser, ReviewDetail, ReviewsType } from "../../types/api";

export const reviewApi = createApi({
  reducerPath: "reviewApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    credentials: "include",
  }),
  tagTypes: ["Review", "ReviewDetail"],
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  endpoints: (build) => ({
    getReviews: build.query<ReviewsType, number>({
      query: (page) => `reviews?page=${page}&limit=5`,
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
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache: any, newItems: any) => {
        currentCache.data.push(...newItems.data);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
    getPersonalReviews: build.query<ReviewDetail[], void>({
      query: () => "reviews/personal",
      transformResponse(baseQueryReturnValue: any, meta, arg) {
        return baseQueryReturnValue.data;
      },
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
      providesTags: (result) =>
        result
          ? [
              {
                type: "ReviewDetail" as const,
                id: result._id,
              },
              { type: "ReviewDetail", id: "LIST" },
            ]
          : [{ type: "ReviewDetail", id: "LIST" }],
    }),
    likeReview: build.mutation<ReviewDetail, string>({
      query: (id) => ({
        url: `reviews/like/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: [
        { type: "Review", id: "LIST" },
        { type: "ReviewDetail", id: "LIST" },
      ],
    }),
    getUserAllReviews: build.query<ReviewAndUser, string>({
      query: (id) => `reviews/user/${id}`,
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
  useGetPersonalReviewsQuery,
  useGetUserAllReviewsQuery,
  useLikeReviewMutation,
} = reviewApi;
