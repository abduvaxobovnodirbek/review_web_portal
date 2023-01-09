import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ReviewDetail, User } from "../../../types/api";

export const adminControlApi = createApi({
  reducerPath: "adminControlApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    credentials: "include",
  }),
  tagTypes: ["Users", "Reviews"],

  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  endpoints: (build) => ({
    getAllUsers: build.query<User[], void>({
      query: () => "user/all",
      transformResponse(baseQueryReturnValue: any, meta, arg) {
        return baseQueryReturnValue.data;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }: any) => ({
                type: "Users" as const,
                id,
              })),
              { type: "Users", id: "LIST" },
            ]
          : [{ type: "Users", id: "LIST" }],
    }),

    getAllReviews: build.query<ReviewDetail[], void>({
      query: () => "reviews/all",
      transformResponse(baseQueryReturnValue: any, meta, arg) {
        return baseQueryReturnValue.data;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }: any) => ({
                type: "Reviews" as const,
                id,
              })),
              { type: "Reviews", id: "LIST" },
            ]
          : [{ type: "Reviews", id: "LIST" }],
    }),

    deleteUser: build.mutation<any, string>({
      query: (id) => ({
        url: `user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
    changeUserStatus: build.mutation<User, { status: boolean; id: string }>({
      query: (data) => ({
        url: `user/status/${data.id}`,
        method: "PATCH",
        body: { status: data.status },
      }),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useChangeUserStatusMutation,
  useGetAllReviewsQuery,
} = adminControlApi;
