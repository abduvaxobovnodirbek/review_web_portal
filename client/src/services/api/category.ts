import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Category } from "../../types/api";

export const categoryApi = createApi({
  reducerPath: "category",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    credentials: "include",
  }),
  tagTypes: ["typeCategory"],
  endpoints: (build) => ({
    createCategory: build.mutation<Category, Partial<Category>>({
      query: (body) => ({
        url: "categories",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "typeCategory", id: "LIST" }],
    }),
    getCategories: build.query<Category[], void>({
      query: () => "categories",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }: any) => ({
                type: "typeCategory" as const,
                id,
              })),
              { type: "typeCategory", id: "LIST" },
            ]
          : [{ type: "typeCategory", id: "LIST" }],
      transformResponse(baseQueryReturnValue: any, meta, arg) {
        return baseQueryReturnValue.data;
      },
    }),
  }),
});

export const { useCreateCategoryMutation, useGetCategoriesQuery } = categoryApi;
