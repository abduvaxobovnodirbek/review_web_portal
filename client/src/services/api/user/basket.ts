import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ReviewDetail } from "../../../types/api";

export const basketApi = createApi({
  reducerPath: "basketApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    credentials: "include",
  }),
  tagTypes: ["basketList"],
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  endpoints: (build) => ({
    getBasket: build.query<ReviewDetail[], void>({
      query: () => `user/saved-reviews`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }: any) => ({
                type: "basketList" as const,
                id,
              })),
              { type: "basketList", id: "LIST" },
            ]
          : [{ type: "basketList", id: "LIST" }],
      transformResponse(baseQueryReturnValue: any, meta, arg) {
        return baseQueryReturnValue.data;
      },
    }),
    insertToBasket: build.mutation<any, { reviewId: string }>({
      query: (body) => ({
        url: "user/saved-reviews",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "basketList", id: "LIST" }],
    }),
    removeFromBasket: build.mutation<any, string>({
      query: (id) => ({
        url: `user/saved-reviews/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: [{ type: "basketList", id: "LIST" }],
    }),
  }),
});

export const {
  useGetBasketQuery,
  useInsertToBasketMutation,
  useRemoveFromBasketMutation,
} = basketApi;
