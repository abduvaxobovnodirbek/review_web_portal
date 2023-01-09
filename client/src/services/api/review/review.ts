import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query/react";
import {
  FormValues,
  ReviewAndUser,
  ReviewDetail,
  ReviewsType,
} from "../../../types/api";

export const reviewApi = createApi({
  reducerPath: "reviewApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    credentials: "include",
  }),
  tagTypes: ["Review", "ReviewDetail", "PersonalReview", "FollowingReview"],
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  endpoints: (build) => ({
    getReviews: build.query<ReviewsType, number>({
      query: (page) => `reviews?page=${page}&limit=10`,
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
      merge: (
        currentCache: ReviewsType,
        newItems: ReviewsType,
        otherArgs: {
          arg: number;
          baseQueryMeta: FetchBaseQueryMeta | undefined;
          requestId: string;
          fulfilledTimeStamp: number;
        }
      ) => {
        if (otherArgs?.arg > 1) {
          currentCache.data.push(...newItems.data);
        }
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
    getFollowingReviews: build.query<ReviewsType, number>({
      query: (page) => `reviews/following?page=${page}&limit=5`,

      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      merge: (
        currentCache: ReviewsType,
        newItems: ReviewsType,
        otherArgs: {
          arg: number;
          baseQueryMeta: FetchBaseQueryMeta | undefined;
          requestId: string;
          fulfilledTimeStamp: number;
        }
      ) => {
        if (otherArgs?.arg > 1) {
          currentCache.data.push(...newItems.data);
        }
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }: any) => ({
                type: "FollowingReview" as const,
                id,
              })),
              { type: "FollowingReview", id: "LIST" },
            ]
          : [{ type: "FollowingReview", id: "LIST" }],
    }),
    getPersonalReviews: build.query<ReviewDetail[], void>({
      query: () => "reviews/personal",
      transformResponse(baseQueryReturnValue: any, meta, arg) {
        return baseQueryReturnValue.data;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }: any) => ({
                type: "PersonalReview" as const,
                id,
              })),
              { type: "PersonalReview", id: "LIST" },
            ]
          : [{ type: "PersonalReview", id: "LIST" }],
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
    createReview: build.mutation<any, FormValues>({
      query: (body) => ({
        url: "reviews",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Review", id: "LIST" }],
    }),
    deleteReview: build.mutation<any, string>({
      query: (id) => ({
        url: `reviews/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [
        { type: "Review", id: "LIST" },
        { type: "PersonalReview", id: "LIST" },
      ],
    }),
    editReview: build.mutation<any, FormValues>({
      query: (body) => ({
        url: `reviews/${body.review_id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: [
        { type: "Review", id: "LIST" },
        { type: "PersonalReview", id: "LIST" },
      ],
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
  useDeleteReviewMutation,
  useEditReviewMutation,
  useGetFollowingReviewsQuery,
} = reviewApi;
